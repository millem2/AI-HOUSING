import { BienIciData } from "../../crawlers/bienIciCrawler.js";
import { IFinalData } from "./../IFinalData.js";
import { BaseFactory } from "./baseFactory.js";

export class BienIciFactory extends BaseFactory<BienIciData> {
  constructor() {
    super({
      sourcePathFile: "./../../../../data/bien_ici_datas_18_02_24.json",
      destFileName: "finalDatas.json",
    });
  }
  convert(data: BienIciData): IFinalData {
    return {
      title: data.title,
      url: data.url,
      description: data.description,
      photos: data.photos,
      price: data.price,
      location: data.location,
      surface: data.surface,
      rooms: data.rooms,
    };
  }
}
