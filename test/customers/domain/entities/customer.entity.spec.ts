import { CustomerEntity } from "@/customers/domain/entities/customer.entity";

const customerData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "123456789",
  createdAt: new Date(),
  updatedAt: new Date(),
  credits: [],
};

describe("CustomerEntity", () => {
  it("should create a CustomerEntity from primitives values", () => {
    const customer = CustomerEntity.createFromPrimitives(customerData);
    expect(customer.getId().getValue()).toBe(customerData.id);
    expect(customer.getName()).toBe(customerData.name);
    expect(customer.getEmail()).toBe(customerData.email);
    expect(customer.getPhone()).toBe(customerData.phone);
    expect(customer.getCreatedAt().getValue()).toBe(customerData.createdAt);
    expect(customer.getUpdatedAt().getValue()).toBe(customerData.updatedAt);
  });

  it("should create a CustomerEntity from a plain object", () => {
    const customer = CustomerEntity.createToPrimitives({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
    });

    expect(customer).toHaveProperty("id");
    expect(customer).toHaveProperty("createdAt");
    expect(customer).toHaveProperty("updatedAt");
    expect(customer.name).toBe(customerData.name);
    expect(customer.email).toBe(customerData.email);
    expect(customer.phone).toBe(customerData.phone);
  });

  it("should update the customer data", () => {
    const customer = CustomerEntity.createFromPrimitives(customerData);
    customer.setEmail("john.doe@example.com");
    customer.setPhone("987654321");
    customer.setName("John D.");

    expect(customer.getEmail()).toBe("john.doe@example.com");
    expect(customer.getPhone()).toBe("987654321");
    expect(customer.getName()).toBe("John D.");
  });

  it("should return the customer data as a plain object", () => {
    const customer = CustomerEntity.createFromPrimitives(customerData);
    const customerPrimitives = customer.toPrimitives();

    expect(customerPrimitives.id).toBe(customerData.id);
    expect(customerPrimitives.name).toBe(customer.getName());
    expect(customerPrimitives.email).toBe(customer.getEmail());
    expect(customerPrimitives.phone).toBe(customer.getPhone());
    expect(customerPrimitives.createdAt).toBe(customerData.createdAt);
    expect(customerPrimitives.updatedAt).toBe(customerData.updatedAt);
  });
});
