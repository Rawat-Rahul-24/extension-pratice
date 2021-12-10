function getRandomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name == "FetchWord") {
    const apiKey = "";
    const dateStr = new Date().toISOString().slice(0, 10);
    const api =
      "https://api.wordnik.com/v4/words.json/wordOfTheDay?date=" +
      dateStr +
      "&api_key=" +
      apiKey;

    const wordObj = ["hello", "gumption", "kickass", "subtle"];
    const wordDesc = ["greeting", "intiative", "kickass", "gentle, touche"];

    var num = getRandomNum(4);

    response({ word: wordObj[num], desc: wordDesc[num] });
  }
});
