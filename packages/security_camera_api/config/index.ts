interface Config {
  hostname: string,
  port: number,
  enableHTTPS: boolean,
  wsUrl: string,
  url: string,
}

export const config: Config = {
  hostname: "localhost",
  port: 8080,
  enableHTTPS: false,
  wsUrl: "ws://localhost:8080",
  url: "http://localhost:8080",
};

export function setHostname(hostname: string) {
  config.hostname = hostname;
  config.url = `http${config.enableHTTPS ? "s" : ""}://${hostname}:${config.port}`;
  config.wsUrl = `ws${config.enableHTTPS ? "s" : ""}://${hostname}:${config.port}`;
}

export function setPort(port: number) {
  config.port = port;
  config.url = `http${config.enableHTTPS ? "s" : ""}://${config.hostname}:${port}`;
  config.wsUrl = `ws${config.enableHTTPS ? "s" : ""}://${config.hostname}:${port}`;
}

export function enableHTTPS(use: boolean) {
  config.enableHTTPS = use;
  config.url = `http${use ? "s" : ""}://${config.hostname}:${config.port}`;
  config.wsUrl = `ws${use ? "s" : ""}://${config.hostname}:${config.port}`;
}

