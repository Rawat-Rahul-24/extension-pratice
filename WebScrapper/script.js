document.querySelector(".add-cmd").addEventListener("click", function () {
  var newiItem = ` <div class="command-items">
            <select>
                <option value="wait">Wait</option>
                <option value="click">Click</option>
                <option value="enter">Enter value</option>
                <option value="save">Save</option>
            </select>
            <input placeholder="200ms" class="value-1">
            <input placeholder="Optional" class="value-2">
        </div>`;

  document.querySelector(".command-list").innerHTML += newiItem;
});

document.querySelector(".run").addEventListener("click", function () {
  createCmdObject();
});

function createCmdObject() {
  var cmdArr = [];

  var cmd = document.querySelectorAll(".command-list .command-items");

  for (var i = 0; i < cmd.length; i++) {
    var itemObj = {};
    itemObj.type = cmd[i].querySelector("select").value;
    itemObj.one = cmd[i].querySelector(".value-1").value;
    itemObj.two = cmd[i].querySelector(".value-2").value;
    cmdArr.push(itemObj);
  }

  console.log(cmdArr);

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    var obj = cmdArr;
    chrome.tabs.sendMessage(activeTab.id, {
      command: "runCommands",
      data: obj,
    });
  });
}
