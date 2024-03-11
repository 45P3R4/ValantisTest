import { md5 } from "./hashmd5.js";
import { getPass } from "./auth.js";

const reqHeaders = new Headers();
const xAuth = md5(getPass());
reqHeaders.append("X-Auth", xAuth);
reqHeaders.append("Content-Type", "application/json");

export async function requestData(reqBody) {
    const response = await fetch("https://api.valantis.store:41000/", {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody)
      });
    if(!response.ok) {
      requestData(reqBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
      return response.json();
    }
  }