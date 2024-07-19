import { container } from "@/core";
import { CreditsRepository } from "@/credits/infrastructure/repositories/credits.repository";
import { CreditsService } from "@/credits/infrastructure/services/credits.service";
import { CustomersRepository } from "@/customers/infrastructure/database/repositories/customers.repository";
import { CustomersService } from "@/customers/infrastructure/database/services/customers.service";

container.bind<CustomersService>("CustomersService").to(CustomersService);
container
  .bind<CustomersRepository>("CustomersRepository")
  .to(CustomersRepository);
container.bind<CreditsService>("CreditsService").to(CreditsService);
container.bind<CreditsRepository>("CreditsRepository").to(CreditsRepository);

export { container };
