chrome.runtime.sendMessage({ name: "FetchWord" }, (response) => {
  console.log(response);

  document.querySelector("h1").innerHTML = response.word;
  document.querySelector("p").innerHTML = response.desc;
});
