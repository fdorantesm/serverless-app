import { model, Schema } from "mongoose";

const CreditSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  currency: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
    index: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  cutOffDay: {
    type: Number,
    required: true,
    index: true,
  },
});

export const CreditModel = model("Credit", CreditSchema);
