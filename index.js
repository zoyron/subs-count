const request = require("request-promise");
const cheerio = require("cheerio");

(async () => {
  let youtubeChannelUrl = "https://www.youtube.com/EdSheeran";

  let response = await request(youtubeChannelUrl);
  let $ = cheerio.load(response);
  let subscriberCount = $(
    '[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]'
  ).attr("title");
  console.log(subscriberCount);
})();
