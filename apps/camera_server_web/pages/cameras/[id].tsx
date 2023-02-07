import { Button, Logo } from "ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCameraClientServer, Stream } from "camera_server_api";

export default function Handler() {
  const cameraClient = useCameraClientServer();
  const streamsQuery = useQuery("streams", () => cameraClient.getStreams());

  const router = useRouter();
  const { id } = router.query;

  const streamQuery = useQuery(["stream", id], () => cameraClient.getStream(id as string), {
    enabled: !!id
  });

  const streams = streamsQuery.data;
  const stream = streamQuery.data;

  const videoRef = useRef<HTMLVideoElement>(null);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const [stream, disconnect] = await cameraClient.connectToStream(id as string);
      if (videoRef.current && stream) {
        console.log("updating stream 1");
        videoRef.current.srcObject = stream;
        videoRef.current.autoplay = true;
        videoRef.current.controls = true;
      }
      setConnected(true);
    })();
  }, [id]);

  return (
    <div className="w-auto flex">
      <div className="bg-primary h-screen flex flex-col items-center">
        <div className="flex items-center mr-4 my-4">
          <div className="h-24 w-24 relative">
            <Image src={Logo.src} fill alt="Smart Factory logo" />
          </div>
          <h2 className="text-primary-text font-bold">
            Smart Factory <br />
            Camera System
          </h2>
        </div>
        {
          streamsQuery.isSuccess ?
            streams?.map((camera) => {
              return (
                <Link href={`/cameras/${camera.id}`} className="hover:bg-button-highlight transition-all">
                  <div className="flex p-4 gap-4 items-center border-t-2 border-primary-border">
                    <h3 className="w-24 text-primary-text font-bold ml-2">
                      {camera.name}
                    </h3>
                    <div className="bg-gray h-20 aspect-[16/9] rounded">

                    </div>
                  </div>
                </Link>
              );
            }) : null
        }

      </div>
      <div className="flex flex-col w-full max-w-4xl mx-auto my-8 gap-4">

        <video className="w-full aspect-[16/9] rounded" ref={videoRef}></video>
        {
          streamQuery.isSuccess ?
            <h1 className="text-4xl">
              {stream?.name}
            </h1> : null
        }

      </div>
    </div>
  );
}
