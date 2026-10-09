import { Models } from "react-native-appwrite";

export interface Agent extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

export interface Gallery extends Models.Document {
  image: string;
}

export interface Review extends Models.Document {
  avatar: string;
  name: string;
  review: string;
}

export interface Property extends Models.Document {
  name: string;
  type: string;
  description: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: string[];
  image: string;
  geolocation: string;

  agent: Agent;
  gallery: Gallery[];
  reviews: Review[];
}
