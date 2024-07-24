import Datastore from "nedb-promises";

import { CreditsMemoryRepository } from "#/credits/infrastructure/persistence/repositories/credits.memory-repository";
import { Container } from "@/core/injection";
import { CreateCreditUseCase } from "@/credits/application/use-cases/create-credit.use-case";
import { GetCreditUseCase } from "@/credits/application/use-cases/get-credit.use-case";
import { GetCreditsUseCase } from "@/credits/application/use-cases/get-credits.use-case";
import { UpdateCreditUseCase } from "@/credits/application/use-cases/update-credit.use-case";
import { CreateCustomerUseCase } from "@/customers/application/use-cases/create-customer.use-case";
import { DeleteCustomerUseCase } from "@/customers/application/use-cases/delete-customer.use-case";
import { GetCustomerUseCase } from "@/customers/application/use-cases/get-customer.use-case";
import { ListCustomersUseCase } from "@/customers/application/use-cases/list-customers.use-case";
import { UpdateCustomerUseCase } from "@/customers/application/use-cases/update-customer.use-case";
import { CustomersService } from "@/customers/infrastructure/database/services/customers.service";
import { CustomersMemoryRepository } from "#/customers/infrastructure/persistence/repositories/customers.memory-repository";

export const container = new Container();

container.bind("CustomerModel").toConstantValue(Datastore.create());
container.bind("CreditModel").toConstantValue(Datastore.create());
container.bind("CreditsRepository").to(CreditsMemoryRepository);
container.bind("CustomersRepository").to(CustomersMemoryRepository);
container.bind("CustomersService").to(CustomersService);
container.bind("CreditsService").to(CreditsMemoryRepository);
container.bind("CreateCustomerUseCase").to(CreateCustomerUseCase);
container.bind("GetCustomerUseCase").to(GetCustomerUseCase);
container.bind("UpdateCustomerUseCase").to(UpdateCustomerUseCase);
container.bind("ListCustomersUseCase").to(ListCustomersUseCase);
container.bind("DeleteCustomerUseCase").to(DeleteCustomerUseCase);
container.bind("GetCreditUseCase").to(GetCreditUseCase);
container.bind("GetCreditsUseCase").to(GetCreditsUseCase);
container.bind("CreateCreditUseCase").to(CreateCreditUseCase);
container.bind("UpdateCreditUseCase").to(UpdateCreditUseCase);
