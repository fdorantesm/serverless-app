import { container } from "@/core";
import { CreditsRepository } from "@/credits/infrastructure/repositories/credits.repository";
import { CreditsService } from "@/credits/infrastructure/services/credits.service";

container.bind<CreditsService>("CreditsService").to(CreditsService);
container.bind<CreditsRepository>("CreditsRepository").to(CreditsRepository);

export { container };
