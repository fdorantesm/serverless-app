import { container } from "@/core";
import { CreditsRepository } from "@/credits/infrastructure/repositories/credits.repository";
import { CreditsService } from "@/credits/infrastructure/services/credits.service";
import { CreateCreditUseCase } from "@/credits/application/use-cases/create-credit.use-case";
import { CreditModel } from "@/credits/infrastructure/models/credit.model";
import { UpdateCreditUseCase } from "@/credits/application/use-cases/update-credit.use-case";
import type { GetCreditUseCase } from "@/credits/application/use-cases/get-credit.use-case";

container.bind("CreateCreditUseCase").to(CreateCreditUseCase);
container.bind("CreditsService").to(CreditsService);
container.bind("CreditsRepository").to(CreditsRepository);
container.bind("CreditModel").toConstantValue(CreditModel);

export {
  container,
  CreateCreditUseCase,
  UpdateCreditUseCase,
  GetCreditUseCase,
};
