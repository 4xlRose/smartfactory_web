const fs = require("fs");
const toml = require("toml");
const path = require("path");

let CONFIG_PATH;

if (process.env.CAMERA_SERVER_WEB_CONFIG_FOLDER !== undefined) {
  CONFIG_PATH = process.env.CAMERA_SERVER_WEB_CONFIG_FOLDER;
} else if (process.env.XDG_CONFIG_HOME !== undefined) {
  CONFIG_PATH = process.env.XDG_CONFIG_HOME;
  CONFIG_PATH = path.join(CONFIG_PATH, "camera_server_web");
} else {
  const HOME_PATH = process.env.HOME;
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
    "camera_server_use_https = false")
}

const rawToml = fs.readFileSync(CONFIG_FILE, {
  encoding: 'utf8'
})
const config = toml.parse(rawToml)

module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"]
  },
  env: {
    CAMERA_SERVER_HOST: config.camera_server_host,
    CAMERA_SERVER_PORT: config.camera_server_port,
    CAMERA_SERVER_USE_HTTPS: config.camera_server_use_https
  }
};
