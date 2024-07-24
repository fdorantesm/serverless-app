import { container } from "@/core";
import { CreateCreditUseCase } from "@/credits/application/use-cases/create-credit.use-case";
import { GetCreditUseCase } from "@/credits/application/use-cases/get-credit.use-case";
import { GetCreditsUseCase } from "@/credits/application/use-cases/get-credits.use-case";
import { UpdateCreditUseCase } from "@/credits/application/use-cases/update-credit.use-case";
import { CreditModel } from "@/credits/infrastructure/models/credit.model";
import { CreditsDatabaseRepository } from "@/credits/infrastructure/repositories/credits.database-repository";
import { CreditsService } from "@/credits/infrastructure/services/credits.service";
import { CreateCustomerUseCase } from "@/customers/application/use-cases/create-customer.use-case";
import { DeleteCustomerUseCase } from "@/customers/application/use-cases/delete-customer.use-case";
import { GetCustomerUseCase } from "@/customers/application/use-cases/get-customer.use-case";
import { ListCustomersUseCase } from "@/customers/application/use-cases/list-customers.use-case";
import { UpdateCustomerUseCase } from "@/customers/application/use-cases/update-customer.use-case";
import { CustomerModel } from "@/customers/infrastructure/database/models/customer.model";
import { CustomersDatabaseRepository } from "@/customers/infrastructure/database/repositories/customers.database-repository";
import { CustomersService } from "@/customers/infrastructure/database/services/customers.service";

container.bind("CustomerModel").toConstantValue(CustomerModel);
container.bind("CustomersService").to(CustomersService);
container.bind("CustomersRepository").to(CustomersDatabaseRepository);

container.bind("CreditModel").toConstantValue(CreditModel);
container.bind("CreditsRepository").to(CreditsDatabaseRepository);
container.bind("CreditsService").to(CreditsService);
container.bind("CreateCreditUseCase").to(CreateCreditUseCase);
container.bind("UpdateCreditUseCase").to(UpdateCreditUseCase);
container.bind("GetCreditUseCase").to(GetCreditUseCase);
container.bind("GetCreditsUseCase").to(GetCreditsUseCase);
container.bind("CreateCustomerUseCase").to(CreateCustomerUseCase);
container.bind("GetCustomerUseCase").to(GetCustomerUseCase);
container.bind("ListCustomersUseCase").to(ListCustomersUseCase);
container.bind("UpdateCustomerUseCase").to(UpdateCustomerUseCase);
container.bind("DeleteCustomerUseCase").to(DeleteCustomerUseCase);

export { container };
