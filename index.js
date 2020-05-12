const request = require("request-promise");
const cheerio = require("cheerio");
const cron = require("node-cron");

let checkSubscriberCount = async (channelUrl) => {
  let response = await request(channelUrl);
  let $ = cheerio.load(response);
  let subscriberCount = $(
    '[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]'
  ).attr("title");

  return subscriberCount;
};

(async () => {
  let youtubeChannelUrl = "https://www.youtube.com/EdSheeran";

  cron.schedule("* * * * * *", async () => {
    let subs = await checkSubscriberCount(youtubeChannelUrl);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log(`Subscribers: ${subs}`);
  });
})();
