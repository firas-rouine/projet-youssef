import axios from "axios";
import { Car } from "@/lib/types";

// Base API URL for Strapi
const API_URL = "http://localhost:1337/api/cars";

// Interface for Strapi's response structure
interface StrapiCarResponse {
  id: number; // Strapi uses number for id
  attributes: Omit<Car, "id" | "images" | "availability" | "reviews"> & {
    price?: number; // For backward compatibility
    hasDriver?: boolean; // For backward compatibility
    available?: boolean; // For backward compatibility
    images?: { data: Array<{ attributes: { url: string } }> };
    availability?: { available: boolean; availableDates?: Array<{ startDate: string; endDate: string }> };
    year: string | number; // Handle string or number
    reviews?: Array<{
      id: string;
      userId: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}

// Fetch all cars with images and full data
const getAllCars = async (): Promise<Car[]> => {
  try {
    const response = await axios.get<{ data: StrapiCarResponse[] }>(
      `${API_URL}?populate=images,reviews`
    );
    return response.data.data.map((item) => ({
      id: item.id.toString(), // Convert to string
      brand: item.attributes.brand,
      model: item.attributes.model,
      year: typeof item.attributes.year === "string" ? parseInt(item.attributes.year, 10) : item.attributes.year,
      transmission: item.attributes.transmission,
      fuelType: item.attributes.fuelType,
      seats: item.attributes.seats,
      price: item.attributes.dailyPrice ?? item.attributes.price ?? 0, // Fallback to price
      dailyPrice: item.attributes.dailyPrice ?? item.attributes.price ?? 0,
      hasAC: item.attributes.hasAC ?? false,
      hasGPS: item.attributes.hasGPS ?? false,
      childSeatAvailable: item.attributes.childSeatAvailable ?? false,
      driverAvailable: item.attributes.driverAvailable ?? item.attributes.hasDriver ?? false,
      description: item.attributes.description ?? "",
      images: item.attributes.images?.data?.map((img) => `http://localhost:1337${img.attributes.url}`) || [],
      availability: {
        available: item.attributes.availability?.available ?? item.attributes.available ?? true,
        availableDates: item.attributes.availability?.availableDates?.map((d) => ({
          startDate: d.startDate, // Keep as string
          endDate: d.endDate, // Keep as string
        })),
      },
      features: item.attributes.features ?? [],
      category: item.attributes.category ?? "standard",
      location: item.attributes.location ?? undefined,
      rating: item.attributes.rating ?? undefined,
      reviews: item.attributes.reviews?.map((r) => ({
        id: r.id,
        userId: r.userId,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
      })),
    }));
  } catch (error) {
    console.error("Error fetching all cars:", error);
    throw error;
  }
};

// Fetch a single car by ID with images
export async function getCarById(id: string): Promise<Car> {
  try {
    const response = await axios.get<{ data: StrapiCarResponse }>(
      `${API_URL}/${id}?populate=images,reviews`
    );
    const { data } = response.data;
    if (!data) {
      throw new Error("Car not found");
    }
    return {
      id: data.id.toString(),
      brand: data.attributes.brand,
      model: data.attributes.model,
      year: typeof data.attributes.year === "string" ? parseInt(data.attributes.year, 10) : data.attributes.year,
      transmission: data.attributes.transmission,
      fuelType: data.attributes.fuelType,
      seats: data.attributes.seats,
      price: data.attributes.dailyPrice ?? data.attributes.price ?? 0,
      dailyPrice: data.attributes.dailyPrice ?? data.attributes.price ?? 0,
      hasAC: data.attributes.hasAC ?? false,
      hasGPS: data.attributes.hasGPS ?? false,
      childSeatAvailable: data.attributes.childSeatAvailable ?? false,
      driverAvailable: data.attributes.driverAvailable ?? data.attributes.hasDriver ?? false,
      description: data.attributes.description ?? "",
      images: data.attributes.images?.data?.map((img) => `http://localhost:1337${img.attributes.url}`) || [],
      availability: {
        available: data.attributes.availability?.available ?? data.attributes.available ?? true,
        availableDates: data.attributes.availability?.availableDates?.map((d) => ({
          startDate: d.startDate, // Keep as string
          endDate: d.endDate, // Keep as string
        })),
      },
      features: data.attributes.features ?? [],
      category: data.attributes.category ?? "standard",
      location: data.attributes.location ?? undefined,
      rating: data.attributes.rating ?? undefined,
      reviews: data.attributes.reviews?.map((r) => ({
        id: r.id,
        userId: r.userId,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
      })),
    };
  } catch (error) {
    console.error("Error in getCarById:", error);
    throw error;
  }
};

// Fetch unique car brands
export async function getBrands(): Promise<string[]> {
  try {
    const response = await axios.get<{ data: StrapiCarResponse[] }>(
      `${API_URL}?populate=images`
    );
    const brandsSet = new Set<string>();
    response.data.data.forEach((item) => {
      if (item.attributes?.brand) {
        brandsSet.add(item.attributes.brand);
      }
    });
    return Array.from(brandsSet);
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

// Fetch min/max price range
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  try {
    const response = await axios.get<{ data: StrapiCarResponse[] }>(
      `${API_URL}?populate=images`
    );
    const prices = response.data.data
      .map((item) => item.attributes?.dailyPrice ?? item.attributes?.price)
      .filter((price): price is number => typeof price === "number");

    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  } catch (error) {
    console.error("Error fetching price range:", error);
    throw error;
  }
};

// Search cars with filters
export async function searchCars(filters: {
  brand?: string;
  hasAC?: boolean;
  driverAvailable?: boolean;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  dateRange?: { startDate: string; endDate: string };
}): Promise<Car[]> {
  try {
    const response = await axios.get<{ data: StrapiCarResponse[] }>(
      `${API_URL}?populate=images,reviews`
    );
    let cars: Car[] = response.data.data.map((item) => ({
      id: item.id.toString(),
      brand: item.attributes.brand,
      model: item.attributes.model,
      year: typeof item.attributes.year === "string" ? parseInt(item.attributes.year, 10) : item.attributes.year,
      transmission: item.attributes.transmission,
      fuelType: item.attributes.fuelType,
      seats: item.attributes.seats,
      price: item.attributes.dailyPrice ?? item.attributes.price ?? 0,
      dailyPrice: item.attributes.dailyPrice ?? item.attributes.price ?? 0,
      hasAC: item.attributes.hasAC ?? false,
      hasGPS: item.attributes.hasGPS ?? false,
      childSeatAvailable: item.attributes.childSeatAvailable ?? false,
      driverAvailable: item.attributes.driverAvailable ?? item.attributes.hasDriver ?? false,
      description: item.attributes.description ?? "",
      images: item.attributes.images?.data?.map((img) => `http://localhost:1337${img.attributes.url}`) || [],
      availability: {
        available: item.attributes.availability?.available ?? item.attributes.available ?? true,
        availableDates: item.attributes.availability?.availableDates?.map((d) => ({
          startDate: d.startDate, // Keep as string
          endDate: d.endDate, // Keep as string
        })),
      },
      features: item.attributes.features ?? [],
      category: item.attributes.category ?? "standard",
      location: item.attributes.location ?? undefined,
      rating: item.attributes.rating ?? undefined,
      reviews: item.attributes.reviews?.map((r) => ({
        id: r.id,
        userId: r.userId,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
      })),
    }));

    if (filters.brand) {
      cars = cars.filter((car) => car.brand === filters.brand);
    }
    if (filters.hasAC !== undefined) {
      cars = cars.filter((car) => car.hasAC === filters.hasAC);
    }
    if (filters.driverAvailable !== undefined) {
      cars = cars.filter((car) => car.driverAvailable === filters.driverAvailable);
    }
    if (filters.minPrice !== undefined) {
      cars = cars.filter((car) => car.dailyPrice >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      cars = cars.filter((car) => car.dailyPrice <= filters.maxPrice);
    }
    if (filters.category) {
      cars = cars.filter((car) => car.category === filters.category);
    }
    if (filters.dateRange) {
      cars = cars.filter((car) =>
        car.availability.availableDates?.some(
          (range) =>
            new Date(filters.dateRange.startDate) >= new Date(range.startDate) &&
            new Date(filters.dateRange.endDate) <= new Date(range.endDate)
        )
      );
    }

    return cars;
  } catch (error) {
    console.error("Error in searchCars:", error);
    throw error;
  }
};

export const carService = {
  getAllCars,
  getCarById,
  getBrands,
  getPriceRange,
  searchCars,
};