/* eslint-disable turbo/no-undeclared-env-vars */
import "ui/globals.css";

import {
  QueryClient,
  QueryClientProvider
} from "react-query";

import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import getConfig from "next/config";
import { CameraServerClientProvider } from "camera_server_api/CameraServerClientProvider";
import { CameraServerClient } from "camera_server_api";

const { publicRuntimeConfig } = getConfig();

const queryClient = new QueryClient();
const cameraServerClient = new CameraServerClient({
  host: publicRuntimeConfig.cameraServerHost,
  port: publicRuntimeConfig.cameraServerPort,
  useHTTPS: publicRuntimeConfig.cameraServerUseHttps,
  serviceHost: publicRuntimeConfig.cameraServiceHost,
  servicePort: publicRuntimeConfig.cameraServicePort,
  serviceUseHTTPS: publicRuntimeConfig.cameraServiceUseHTTPS,
});


export default function SFApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <CameraServerClientProvider client={cameraServerClient}>
      <Component {...pageProps} />
    </CameraServerClientProvider>
  </QueryClientProvider>;
}

SFApp.getInitialProps = async (ctx: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(ctx);
  return { ...appProps };
};