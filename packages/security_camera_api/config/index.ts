import axios, { AxiosInstance } from "axios";

interface Config {
  hostname?: string,
  port?: number,
  useHTTP?: boolean,
}

let defaults: Config = {
  hostname: "localhost",
  port: 8080,
  useHTTP: true
};

class SecurityCameraAPI {
  private config: Config;
  private axios: AxiosInstance;

  constructor(config: Config = {}) {
    this.config = { ...defaults, ...config };
    this.axios = axios.create({
      baseURL: `http${config.useHTTP ? "" : "s"}://${config.hostname}:${config.port}`
    });
  }
}
