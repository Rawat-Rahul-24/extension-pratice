chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == "runCommands") {
    console.log("inside content script");
    window.ScrapperExt = [];
    var scrapeObj = msg.data;
    console.log(scrapeObj);
    getNext(scrapeObj, 0);
  }
});

function wait(obj, index) {
  var item = obj[index];
  var timeout = parseInt(item.one);
  setTimeout(function () {
    getNext(obj, index + 1);
  }, timeout);
}

function click(obj, index) {
  var item = obj[index];
  document.querySelector(item.one).click();
  getNext(obj, index + 1);
}

function save(obj, index, endItem) {
  var item = obj[index];
  var value = document.querySelector(item.one).innerText;
  window.ScrapperExt.push(value);
  getNext(obj, index + 1);
}

function enter(obj, index, endItem) {
  var item = obj[index];
  document.querySelector(item.one).value = item.two;

  getNext(obj, index + 1);
}

function getNext(obj, index) {
  if (typeof obj[index] !== "undefined") {
    if (obj[index].type == "click") {
      click(obj, index);
    }
    if (obj[index].type == "wait") {
      wait(obj, index);
    }
    if (obj[index].type == "save") {
      save(obj, index);
    }
    if (obj[index].type == "enter") {
      enter(obj, index);
    }
  } else {
    chrome.runtime.sendMessage({
      command: "run-complete",
      data: window.ScrapperExt,
    });
  }
}
