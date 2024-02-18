import { IFinalData } from "./../IFinalData.js";
import { BaseFactory } from "./baseFactory.js";

interface old_seloger_data {
  id: number;
  object: string;
  result_position: number;
  annonce_id: number;
  agency_id: number;
  agency_page: string;
  agency_contact_name: string;
  agency_img_url: string;
  agency_phone_number: string;
  agency_has_email: string;
  agency_link: string;
  address: string;
  area: number;
  bedrooms_count: number;
  business_unit: number;
  coownership_annual_charges: any;
  coownership_number_of_lots: string;
  coownership_is_syndic_procedure: string;
  contact_is_private_seller: string;
  contact_email: string;
  description: string;
  district: string;
  dpe: string;
  estate_type: string;
  electricity_consumption: any;
  estate_type_id: number;
  features: string;
  ges: string;
  gas_emissions: any;
  highlighting_level: number;
  insee_code: string;
  is_furnished: string;
  is_exclusive: string;
  is_redirected: string;
  is_expired: string;
  latitude: any;
  longitude: any;
  monthly_price: number;
  main_picture: string;
  nature: number;
  postal_code: number;
  position: any;
  picture_count: number;
  price: number;
  price_per_meter: number;
  photos: string;
  price_decrease_percent: any;
  publication_id: number;
  pricing_price_note: string;
  ref: any;
  rooms: number;
  short_description: string;
  transaction_type: number;
  title: string;
  tags: string;
  url: string;
  video_url: string;
  virtual_visit_url: string;
  collected_at: string;
  input_url: string;
}

export class SelogerFactory extends BaseFactory<old_seloger_data> {
  constructor() {
    super({
      sourcePathFile: "./../../../../data/seloger_datas_09_02_2024.json",
      destFileName: "finalDatas.json",
    });
  }
  convert(data: old_seloger_data): IFinalData {
    return {
      title: data.title,
      url: data.url,
      description: data.description,
      // split the string into an array and erase the space :
      photos: data.photos.split(",").map((photo) => photo.trim()),
      price: data.price,
      location: data.address,
      surface: data.area,
      rooms: data.rooms,
    };
  }
}
