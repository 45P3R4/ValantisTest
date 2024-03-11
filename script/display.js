export function displayItems(items, container) {
    items.forEach(element => {
      let itemCard = document.createElement("div");
      container.appendChild(itemCard);
      itemCard.setAttribute("class", "product");
      itemCard.innerHTML = 
        "Товар: " + element.product + 
        "<br>Бренд: " + (element.brand ? element.brand : "-") +
        "<br>Цена: " + element.price +
        "<br>ID: " + element.id;
    });
  }