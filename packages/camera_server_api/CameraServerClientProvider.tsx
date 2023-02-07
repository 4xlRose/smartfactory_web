import CameraServerClient from "./CameraServerClient";
import React, {ReactNode, useContext } from "react";

declare global {
  interface Window {
    CameraServerClientContext?: React.Context<CameraServerClient | undefined>;
  }
}

export const defaultContext = React.createContext<CameraServerClient | undefined>(
  undefined
);

function getCameraServerClientContext() {
  if (typeof window !== "undefined") {
    if (!window.CameraServerClientContext) {
      window.CameraServerClientContext = defaultContext;
    }

    return window.CameraServerClientContext;
  }

  return defaultContext;
}

export function CameraServerClientProvider(props: {
  children: ReactNode;
  client: CameraServerClient;
}) {

  const Context = getCameraServerClientContext();
  return <Context.Provider value={props.client}>
    {props.children}
  </Context.Provider>;
}

export function useCameraClientServer() {
  const cameraClient = useContext(getCameraServerClientContext())

  if (!cameraClient) {
    throw new Error('No camera client provider set!')
  }

  return cameraClient
}