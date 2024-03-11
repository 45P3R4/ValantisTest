import { requestData } from "./requests.js";
import { displayItems } from "./display.js";

const itemsPerRequest = 25;
const itemsPerPage = 50;

var allIDs;
var page = 0;

var itemContainer = document.getElementById("productList");

var pagesList = document.getElementById("page-number");
var pageDisplay = document.getElementById("page-display");

requestData({"action": "get_ids"})
.then((out) => {
  allIDs = [...new Set(out.result)];
  getItems();
  drawPageButtons(allIDs);
});

function getItems() {
  
    requestData({
      "action": "get_items",
      "params": {
        "ids": allIDs.slice((page*itemsPerRequest), (page*itemsPerRequest) + itemsPerRequest)
      }})
    .then((response) => {
      console.log(response.result);
      itemContainer.innerHTML = "";
      displayItems(response.result, itemContainer);
    })
}

function drawPageButtons(allItemsArr) {
  for (let i = 0; i < (allItemsArr.length/itemsPerPage); i++) {
    let pageButton = document.createElement("button");
    pageButton.textContent = (i+1);
    pageButton.setAttribute("class", "page-button");
    pagesList.appendChild(pageButton);
    pageButton.addEventListener("click", function() {
      page = i;
      pageDisplay.textContent = "Страница " + (page+1);
      getItems();
    })
  }
}