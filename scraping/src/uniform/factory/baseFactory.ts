import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { IFinalData } from "./../IFinalData.js";

export abstract class BaseFactory<T extends object> {
  protected destFileName: string = "finalDatas.json";
  private destFilePath: string;
  private sourcePathFile: string = "../../../../data";

  constructor(options: { sourcePathFile: string; destFileName: string }) {
    const { sourcePathFile, destFileName } = options;
    const currentFilePath = fileURLToPath(import.meta.url);
    this.destFilePath = path.join(path.dirname(currentFilePath), "../../../../data");
    this.destFileName = path.join(this.destFilePath, destFileName);
    this.sourcePathFile = path.join(path.dirname(currentFilePath), sourcePathFile);
  }

  public initFile() {
    //create results folder if it doesn't exist
    if (!fs.existsSync(this.destFilePath)) {
      fs.mkdirSync(this.destFilePath);
    }

    fs.writeFileSync(this.destFileName, JSON.stringify([], null, 2), "utf-8");
  }

  private writeToJsonFile(data: any) {
    // Read existing JSON data from the file, if it exists
    let existingData: any[] = [];
    try {
      const existingJson = fs.readFileSync(this.destFileName, "utf-8");
      existingData = JSON.parse(existingJson);
    } catch (error) {
      // If the file doesn't exist or is empty, ignore the error
      console.log(error);
    }

    // Add the new data to the existing data
    existingData.push(data);

    // Write the updated data back to the JSON file
    fs.writeFileSync(this.destFileName, JSON.stringify(existingData, null, 2), "utf-8");
  }

  protected abstract convert(data: T): Promise<IFinalData> | IFinalData;

  public async convertAll() {
    try {
      const existingJson = await fs.promises.readFile(this.sourcePathFile, "utf-8");
      let existingData = JSON.parse(existingJson);

      console.log("data size : ", existingData.length);

      const newDataArray = [];

      //if existingData contains multiple arrays, we flatten it
      if (Array.isArray(existingData[0])) {
        existingData = existingData.flat();
      }

      console.log("data size 2 : ", existingData.length);

      for (const data of existingData) {
        const finalData = await this.convert(data);
        newDataArray.push(finalData);

        // ... (autres opérations si nécessaires)
      }

      // Ajouter toutes les nouvelles données à l'existante
      this.writeToJsonFile(newDataArray);
    } catch (error) {
      console.error(error);
    }
  }
}
