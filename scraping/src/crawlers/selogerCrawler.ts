import { Actor } from "apify";
import { Configuration, Dataset, PlaywrightCrawler } from "crawlee";

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration({
  groups: ["RESIDENTIAL"],
  countryCode: "FR",
});

export const DATASET_NAME = "seloger";
export const EXPORT_FILE_NAME = "seloger_datas_18_02_24";

interface SelogerData {
  title: string;
  url: string;
}

const config = Configuration.getGlobalConfig();

config.set("purgeOnStart", true);

// PlaywrightCrawler crawls the web using a headless browser controlled by the Playwright library.
export const selogerCrawler = new PlaywrightCrawler(
  {
    // Use the requestHandler to process each of the crawled pages.

    async requestHandler({ request, page, enqueueLinks }) {
      console.log(`Processing: ${request.url}`);

      if (request.label === "DETAIL") {
        // Save results as JSON to ./storage/datasets/default
        const title = (await page.locator(".Summarystyled__Title-sc-1u9xobv-4 dbveQQ").textContent()) || "No title";
        console.log("title", title);

        const dataset = await Dataset.open(DATASET_NAME);

        dataset.pushData({
          title: title,
          url: page.url(),
        });
      } else {
        await page.waitForSelector(".sc-bJHhxl");
        await enqueueLinks({
          selector: ".sc-bJHhxl",
          label: "DETAIL", // <= note the different label
        });

        const nextButton = await page.$("a[data-testid='gsl.uilib.Paging.nextButton']");
        if (nextButton) {
          await enqueueLinks({
            selector: "a[data-testid='gsl.uilib.Paging.nextButton']",
            label: "LIST", // <= note the same label
          });
        }
      }
    },
    proxyConfiguration: proxyConfiguration,

    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 40,
    // Uncomment this option to see the browser window.
    // headless: false,
  },
  config
);
