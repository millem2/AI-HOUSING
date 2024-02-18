import { BienIciFactory } from "./factory/bienIciFactory.js";
import { SelogerFactory } from "./factory/selogerFactory.js";

export const uniformDatas = async () => {
  const bienIciFactory = new BienIciFactory();
  bienIciFactory.initFile();
  await bienIciFactory.convertAll();
  console.log("bienIci uniformed");
  const selogerFactory = new SelogerFactory();
  await selogerFactory.convertAll();
  console.log("seloger uniformed");

  return;
};
