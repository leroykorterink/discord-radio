import https from "https";
import { URL } from "url";
import httpsGetPromise from "./httpsGetPromise";

export default async <T>(url: URL | string, options: https.RequestOptions) =>
  new Promise<T>(async (resolve, reject) => {
    const { response } = await httpsGetPromise(url, options);

    let data = "";
    response.on("data", chunk => (data += chunk));

    response.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
  });
