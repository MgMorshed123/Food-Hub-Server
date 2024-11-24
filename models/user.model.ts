import exp from "constants";
import mongoose, { Document } from "mongoose";

export interface Imenu {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ImenuDocument extends Imenu, Document {
  createdAt: Date;
  updatedAt: Date;
}
