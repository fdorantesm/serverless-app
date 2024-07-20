import { container } from "@/core";
import { CreditsRepository } from "@/credits/infrastructure/repositories/credits.repository";
import { CreditsService } from "@/credits/infrastructure/services/credits.service";
import { CustomerModel } from "@/customers/infrastructure/database/models/customer.model";
import { CustomersDatabaseRepository } from "@/customers/infrastructure/database/repositories/customers.database-repository";
import { CustomersService } from "@/customers/infrastructure/database/services/customers.service";

container.bind("CustomerModel").toConstantValue(CustomerModel);
container.bind("CustomersService").to(CustomersService);
container.bind("CustomersRepository").to(CustomersDatabaseRepository);
container.bind("CreditsService").to(CreditsService);
container.bind("CreditsRepository").to(CreditsRepository);

export { container };
