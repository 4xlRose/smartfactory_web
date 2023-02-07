const fs = require("fs");
const toml = require("toml");
const path = require("path");

let CONFIG_PATH;

if (process.env.CAMERA_SERVER_WEB_CONFIG_PATH !== undefined) {
  CONFIG_PATH = process.env.CAMERA_SERVER_WEB_CONFIG_PATH;
  console.log("custom config path");
} else if (process.env.XDG_CONFIG_HOME !== undefined) {
  CONFIG_PATH = process.env.XDG_CONFIG_HOME;
  console.log("config in xdg home");
  CONFIG_PATH = path.join(CONFIG_PATH, "camera_server_web");
} else {
  const HOME_PATH = process.env.HOME;
  console.log("config in $HOME/.config");
  CONFIG_PATH = path.join(HOME_PATH, ".config/camera_server_web");
}

const CONFIG_FILE = path.join(CONFIG_PATH, "config.toml");
fs.mkdirSync(CONFIG_PATH, {
  recursive: true
});

if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE,
    "camera_server_host = 'localhost'\n" +
    "camera_server_port = 3000\n" +
    "camera_server_use_https = false");
}

const rawToml = fs.readFileSync(CONFIG_FILE, {
  encoding: "utf8"
});
const config = toml.parse(rawToml);

console.log(config.camera_server_port);

module.exports = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    transpilePackages: ["ui", "camera_server_api"]
  },
  publicRuntimeConfig: {
    cameraServerHost: config.camera_server_host,
    cameraServerPort: config.camera_server_port,
    cameraServerUseHttps: config.camera_server_use_https
  }
};
