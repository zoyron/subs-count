const request = require("request-promise");
const cheerio = require("cheerio");
const cron = require("node-cron");
const asciichart = require("asciichart");

let checkSubscriberCount = async (channelUrl) => {
  let response = await request(channelUrl);
  let $ = cheerio.load(response);
  let subscriberCount = $(
    '[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]'
  ).attr("title");

  return subscriberCount.replace(/\.+/, ""); // replace all the dots in the subscriber number with nothing
};

(async () => {
  let youtubeChannelUrl = "https://www.youtube.com/EdSheeran";
  let subscriberArray = [];

  cron.schedule("*/2 * * * * *", async () => {
    let subs = await checkSubscriberCount(youtubeChannelUrl);
    subscriberArray.push(subs);

    console.log("\033[2J"); //this line will always clear out the console as soon as the script runs so that we have a much clearer view
    console.log(asciichart.plot(subscriberArray));
  });
})();
