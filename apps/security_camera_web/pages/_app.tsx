import "ui/globals.css";

import {
  QueryClient,
  QueryClientProvider
} from "react-query";

import type { AppProps } from "next/app";
import { setHostname, setPort, enableHTTPS } from "security_camera_api/config";

const queryClient = new QueryClient();

setHostname("10.22.244.185");
setPort(3001);
enableHTTPS(false);

export default function App({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>;
}
