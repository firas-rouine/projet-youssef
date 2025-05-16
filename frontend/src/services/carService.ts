// services/carService.ts
import axios from "axios";
import { Car } from "@/lib/types";

const API_URL = "http://localhost:1337/api/cars";

const getAllCars = async (): Promise<Car[]> => {
  const response = await axios.get(API_URL);
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes,
  }));
};

export const carService = {
  getAllCars,
  // Optional: implement searchCars if using filters
};
