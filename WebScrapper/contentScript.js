chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command === "runCommands") {
    console.log("inside content script");
    var scrapeObj = msg.data;
    console.log(scrapeObj);
    getNext(scrapeObj, 0);
    window.ScrapperExt = [];
  }
});

function wait(obj, index) {
  var item = obj[index];
  var timeout = parseInt(item.one);
  setTimeout(function () {
    getNext(obj, index + 1);
  }, timeout);
}

function click(selector, obj, index) {
  var item = obj[index];
  document.querySelector(item.one).click();

  getNext(obj, index + 1);
}

function save(selector, obj, index, endItem) {
  var item = obj[index];
  var value = document.querySelector(item.one).innerText;
  window.ScrapperExt.push(value);
  getNext(obj, index + 1);
}

function enter(selector, obj, index, endItem) {
  var item = obj[index];
  document.querySelector(item.one).value = item.two;

  getNext(obj, index + 1);
}

function getNext(obj, index) {
  if (typeof obj[index] !== "undefined") {
    if (obj[index].type == "click") {
      click(obj, index);
    }
  } else {
  }
}
