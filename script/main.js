import { getAllIDs } from "./requests.js";
import { getItems } from "./requests.js";

const itemsPerPage = 50;

var ids;
var page = 0;

var itemContainer = document.getElementById("productList");

var pagesList = document.getElementById("page-number");
var pageDisplay = document.getElementById("page-display");

var filterSelect = document.getElementById("filter-select");
var filterText = document.getElementById("filter-text");
var filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", function() {
  let backButton = document.createElement("button");
  let barFilter = document.getElementById("bar-filter");
  barFilter.appendChild(backButton);
  backButton.textContent = "Отменить фильтр";
  backButton.addEventListener("click", function() {
    getAllIDs();
    getItems(ids);
  })
  requestData({
    "action": "filter",
    "params": {[filterSelect.value]: filterText.value}})
    .then((response) => {ids = [...new Set(response.result)]
      console.log(response);
      getItems(ids)
      .then((response) => drawPageButtons(ids))
      
  })
});

getAllIDs()
.then((response) => {
  console.log(response.json());
});

function drawPageButtons(allItemsArr) {
  pagesList.innerHTML = "";
  for (let i = 0; i < (allItemsArr.length/itemsPerPage); i++) {
    let pageButton = document.createElement("button");
    pageButton.textContent = (i+1);
    pageButton.setAttribute("class", "page-button");
    pagesList.appendChild(pageButton);
    pageButton.addEventListener("click", function() {
      page = i;
      pageDisplay.textContent = "Страница " + (page+1);
    })
  }
}