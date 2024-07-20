import { model, Schema } from "mongoose";

export const CustomerSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export const CustomerModel = model("Customer", CustomerSchema);
