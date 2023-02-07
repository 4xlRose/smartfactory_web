import axios from "axios";
import { MsgType, Message, Stream } from "./stream";

function connectToSocket(socketUrl: string) {
  return new Promise<WebSocket>((resolve, reject) => {
    const websocket = new WebSocket(socketUrl);

    websocket.onopen = () => {
      resolve(websocket);
    };

    websocket.onerror = () => {
      reject();
    };
  });
}

interface CameraServerClientConfig {
  host: string,
  port: number,

  useHTTPS?: boolean,

}

export default class CameraServerClient {
  serverUrl: string;
  serverWsUrl: string;


  constructor(config: CameraServerClientConfig) {
    const useHTTPS = config.useHTTPS === undefined ? false : config.useHTTPS;
    this.serverUrl = `http${useHTTPS ? "s" : ""}://${config.host}:${config.port}`;
    this.serverWsUrl = `ws${useHTTPS ? "s" : ""}://${config.host}:${config.port}`;
  }

  async getStreams(): Promise<Stream[]> {
    let res = await axios.get(`${this.serverUrl}/streams`);
    return res.data;
  }

  async getStream(id: string): Promise<Stream> {
    let res = await axios.get(`${this.serverUrl}/streams/${id}`);
    return res.data;
  }

  async connectToStream(id: string): Promise<[MediaStream, () => void]> {
    const socket = await connectToSocket(`${this.serverWsUrl}/streams/${id}/video`);

    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302"
        }
      ]
    });

    const mediaStreamPromise = new Promise<MediaStream>((resolve, _reject) => {
      console.log("handling");
      peer.oniceconnectionstatechange = _e => {
        console.log(`connection state changed to ${peer.iceConnectionState}`);
      };

      peer.onnegotiationneeded = async () => {
        console.log("Negotiation needed");

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        if (peer.localDescription !== null) {
          const msg: Message = {
            type: MsgType.SESSION_DESCRIPTION,
            payload: peer.localDescription
          };
          socket.send(JSON.stringify(msg));
        }
      };

      peer.onicecandidate = async event => {
        const candidate = event.candidate;

        // Candidate is null
        if (!candidate) {
          console.log("end of ice candidates");
          return;
        } else {
          console.log("new ice candidate");
        }

        const message: Message = {
          type: MsgType.ICE_CANDIDATE,
          payload: candidate
        };

        socket.send(JSON.stringify(message));
      };

      peer.ontrack = async event => {
        // Promise resolution point, MediaStream acquired
        resolve(event.streams[0]);
      };

      socket.onmessage = async (e) => {
        const message: Message = JSON.parse(e.data);

        console.log("received message");
        switch (message.type) {
          case MsgType.SESSION_DESCRIPTION:
            switch (peer.signalingState) {
              case "stable":
                console.log("received offer");
                const remoteDescription: RTCSessionDescription = message.payload;

                await peer.setRemoteDescription(remoteDescription);
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                const newMessage: Message = {
                  type: MsgType.SESSION_DESCRIPTION,
                  payload: answer
                };

                console.log("sending answer to peer");
                socket.send(JSON.stringify(newMessage));
                break;
              case "have-local-offer":
                console.log("received answer");
                break;
              default:
                console.log("Received session description while in an invalid state");
            }
            break;
          case MsgType.ICE_CANDIDATE:
            console.log("Received ice candidate");
            console.log(message);
            const iceCandidate: RTCIceCandidateInit = message.payload;
            await peer.addIceCandidate(iceCandidate);
            break;
          default:
            console.log("unsupported message '%i' type received from socket", message.type);
        }
      };
    });

    const track = await mediaStreamPromise;

    const disconnect = () => {
      if (!peer) return;
      console.log("closing peer connection");
      peer.close();
    };

    return [track, disconnect];
  }

}