export interface Stream {
  name: string;
  id: string;
}


export enum MsgType {
  SESSION_DESCRIPTION,
  ICE_CANDIDATE,
  STREAM_DESCRIPTION
}

export interface Message {
  type: MsgType;
  payload: any;
}