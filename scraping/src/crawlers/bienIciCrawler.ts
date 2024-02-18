import { Configuration, Dataset, PlaywrightCrawler } from "crawlee";

export const DATASET_NAME = "bien_ici";
export const EXPORT_FILE_NAME = "bien_ici_datas_18_02_24";

interface BienIciData {
  title: string;
  url: string;
  description: string;
  photos: (string | null)[];
  price: number;
  location: string;
  surface: number;
  rooms: number;
}

const config = Configuration.getGlobalConfig();

config.set("purgeOnStart", false);

// PlaywrightCrawler crawls the web using a headless browser controlled by the Playwright library.
export const bienIciCrawler = new PlaywrightCrawler(
  {
    // Use the requestHandler to process each of the crawled pages.

    async requestHandler({ request, page, enqueueLinks }) {
      console.log(`Processing: ${request.url}`);

      if (request.label === "DETAIL") {
        // Save results as JSON to ./storage/datasets/default
        const title = (await page.locator(".titleInside h1").textContent()) || "No title";
        console.log("title", title);
        const url = page.url();
        const description = (await page.locator(".see-more-description__content").textContent()) || "No description";
        const photos = await page.locator(".slideImg img[u='image']").all();
        const photosUrls = await Promise.all(
          photos.map(async (photo) => {
            const url = await photo.getAttribute("src");
            //erase the parameters of the url to get the original image
            return url?.split("?")[0];
          })
        );

        const currentPriceString = await page.locator(".ad-price__the-price").textContent();
        const rawPrice = currentPriceString?.split("€")[0].replace(/\s/g, "");
        const price = parseFloat(rawPrice || "0");
        const location = await page.locator(".fullAddress").textContent();
        const surfaceString = await page
          .locator("div.labelInfo")
          .filter({
            hasText: "m²",
          })
          .first()
          .textContent();
        const rawSurface = surfaceString?.split("m²")[0].replace(/\s/g, "");
        const surface = parseFloat(rawSurface || "0");
        const roomsString = await page
          .locator("div.labelInfo")
          .filter({
            hasText: "pièces",
          })
          .first()
          .textContent();
        const rawRooms = roomsString?.split("pièces")[0].replace(/\s/g, "");
        const rooms = parseFloat(rawRooms || "0");

        const dataset = await Dataset.open(DATASET_NAME);
        await dataset.pushData({
          title,
          url,
          description,
          photos: photosUrls,
          price,
          location,
          surface,
          rooms,
        });
      } else {
        await page.waitForSelector(".detailedSheetLink");
        await enqueueLinks({
          selector: ".detailedSheetLink",
          label: "DETAIL", // <= note the different label
        });

        const nextButton = await page.$("a.goForward");
        if (nextButton) {
          await enqueueLinks({
            selector: "a.goForward",
            label: "LIST", // <= note the same label
          });
        }
      }
    },

    // Comment this option to scrape the full website.
    // maxRequestsPerCrawl: 150,
    // Uncomment this option to see the browser window.
    // headless: false,
  },
  config
);
