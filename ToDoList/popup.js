document.querySelector(".create").addEventListener("click", function () {
  document.querySelector(".new-item").style.display = "block";
});

document.querySelector(".save").addEventListener("click", function () {
  var item = document.querySelector(".new-item input").value;
  if (item != "") {
    var items = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(items);
    itemsArr.push({ item: item, status: 0 });
    saveItems(itemsArr);
    document.querySelector(".new-item").style.display = "none";
    document.querySelector(".new-item input").value = "";
    fetchItems();
  }
});

function fetchItems() {
  const itemsList = document.querySelector("ul.list");
  itemsList.innerHTML = "";
  var newItemHtml = "";
  try {
    var items = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(items);
    for (var i = 0; i < itemsArr.length; i++) {
      var status = "";
      if (itemsArr[i].status == 1) {
        var status = 'class="done"';
      }
      newItemHtml += `
         <li data-itemIndex=${i} ${status}>
            <span class="item">
            ${itemsArr[i].item}
            </span>
            <div class="icons">
            <span class="completed">✔️</span>
            <span class="delete">🗑️</sapn></span><div>
        </li>`;
    }

    itemsList.innerHTML = newItemHtml;

    var itemsListUl = document.querySelectorAll("ul li");

    for (var i = 0; i < itemsListUl.length; i++) {
      itemsListUl[i]
        .querySelector(".completed")
        .addEventListener("click", function () {
          var dataIndex = this.parentNode.parentNode.dataset.itemindex;
          console.log(dataIndex);
          itemComplete(dataIndex);
        });
      itemsListUl[i]
        .querySelector(".delete")
        .addEventListener("click", function () {
          var dataIndex = this.parentNode.parentNode.dataset.itemindex;
          itemDelete(dataIndex);
        });
    }
  } catch (error) {}
}

function itemComplete(index) {
  var items = localStorage.getItem("todo-items");
  var itemsArr = JSON.parse(items);

  itemsArr[index].status = 1;

  saveItems(itemsArr);
  document
    .querySelector("ul.list li[data-itemIndex='" + index + "']")
    .classList.add("done");
}

function itemDelete(index) {
  var items = localStorage.getItem("todo-items");
  var itemsArr = JSON.parse(items);

  itemsArr.splice(index, 1);
  saveItems(itemsArr);
  document.querySelector("ul.list li[data-itemIndex='" + index + "']").remove();
}

function saveItems(obj) {
  var string = JSON.stringify(obj);
  localStorage.setItem("todo-items", string);
}

fetchItems();
