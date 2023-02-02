/* eslint-disable turbo/no-undeclared-env-vars */
export const SERVER_URL = `http${process.env.CAMERA_SERVER_USE_HTTPS ? "s" : ""}://${process.env.CAMERA_SERVER_HOST}:${process.env.CAMERA_SERVER_PORT}`;
export const SERVER_WS_URL = `ws${process.env.CAMERA_SERVER_USE_HTTPS ? "s" : ""}://${process.env.CAMERA_SERVER_HOST}:${process.env.CAMERA_SERVER_PORT}`;