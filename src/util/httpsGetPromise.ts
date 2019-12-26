import https from "https";
import { IncomingMessage, ClientRequest } from "http";
import { URL } from "url";

export default (url: URL | string, options: https.RequestOptions) =>
  new Promise<{
    request: ClientRequest;
    response: IncomingMessage;
  }>((resolve, reject) => {
    const request: ClientRequest = https.get(
      url,
      {
        headers: {
          accept: "application/json, text/plain, */*"
        }
      },
      response => resolve({ request, response })
    );
  });
