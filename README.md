# Discord Radio

# Development

## Requirements

- NodeJS 12.10 or higher

## Configuration

The application can be configured via environment variables. We use .env files to set the majority of the environment variables, system environment variables will override these values.

| Name       | Start script value | Description                                      |
| ---------- | ------------------ | ------------------------------------------------ |
| `NODE_ENV` | `development`      | Defines in which mode the application is running |

## Build steps

The build tools in the repository are used to transpile the Typescript source code to Javascript. The transpiled Javascript can run using NodeJS 12.10 and higher.

Follow these steps to start a development build for the application:

- Compile the build scripts to Javascript with `npm run init`
- Compile and run the api with `npm run start`. The `start` script will build the application, watch for source changes, and start the application. The application will restart on incremental builds.

Follow these steps to start a production build for the application:

- Compile the build scripts to Javascript with `npm run init`
- Compile and run the api with `npm run build`.
