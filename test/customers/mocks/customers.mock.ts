import { CustomerEntity } from "@/customers/domain/entities/customer.entity";

export const customersMock = [
  CustomerEntity.createFromPrimitives({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    credits: [],
  }),
  CustomerEntity.createFromPrimitives({
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "1234567891",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    credits: [],
  }),
  CustomerEntity.createFromPrimitives({
    id: "3",
    name: "Ane Doe",
    email: "ane@example.com",
    phone: "1234567892",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    credits: [],
  }),
];
