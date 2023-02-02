# Camera server web interface

This application is the main entrypoint for Smart Factory's camera system.

## Running the server

First, from the root of the turborepo execute the followign command to only run this development server:

```bash
turbo run dev --filter=camera_server_web
```

Alternatively, you can build and start a production ready instance with the following commands:

```bash
turbo run build ---filter=camera_server_web

turbo run start --filter=camera_server_web
```

## Configure the server

The server's configuration can be changed via the `config.toml` file located in your system's
default config folder, under `camera_server_web/`. On Linux systems the file is generally located in
`~/.config/camera_server_web/config.toml`

## Building the docker image

The server can be run from a docker image via the included Dockerfile. From the root of the turborepo, execute the following
command to build the image (don't forget to change the tag):
```bash
docker build apps/camera_server_web/Dockerfile -t camera_server_web:{TAG}
```