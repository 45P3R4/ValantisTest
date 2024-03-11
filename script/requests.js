import { md5 } from "./hashmd5.js";
import { getPass } from "./auth.js";

const reqHeaders = new Headers();
const xAuth = md5(getPass());
reqHeaders.append("X-Auth", xAuth);
reqHeaders.append("Content-Type", "application/json");

async function requestData(reqBody) {
    const response = await fetch("https://api.valantis.store:41000/", {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody)
      });
    if(!response.ok) {
      //requestData(reqBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
      return response;
    }
  }

  export async function getAllIDs() {
    requestData({"action": "get_ids"})
    .then((response) => {
        console.log(response.json());
        return response.json();
    })
  }

  export async function getItems(ids) {
    requestData({
      "action": "get_items",
      "params": {
        "ids": ids.slice((page*itemsPerPage), (page*itemsPerPage) + itemsPerPage)
      }})
    .then((response) => {
      return response;
    })
}