// For more information, see https://crawlee.dev/
import { Dataset } from "crawlee";
import { EXPORT_FILE_NAME, selogerCrawler } from "./crawlers/selogerCrawler.js";
import { uniformDatas } from "./uniform/uniform_datas.js";

// Set the 'persistStateIntervalMillis' option
// of global configuration to 10 seconds

const crawl = async () => {
  // Add first URL to the queue and start the crawl.
  await selogerCrawler.run([
    "https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1&idtt=1&naturebien=1&idPays=250&m=search_hp_new",
  ]);
  await Dataset.exportToCSV(EXPORT_FILE_NAME);
  await Dataset.exportToJSON(EXPORT_FILE_NAME);
};

const uniform = async () => {
  // Uniform the datas
  const uniformedDatas = await uniformDatas();
  console.log("finished uniforming datas");
  return;
};

await uniform();
