import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CreateCreditContract } from "@/credits/domain/contracts/create-credit.contract";
import type { CreditsService } from "@/credits/domain/contracts/credits.service";
import { CreditEntity } from "@/credits/domain/entities/credit.entity";
import { CreditAlreadyExistsException } from "@/credits/domain/exceptions/credit-already-exists.exception";

@Injectable()
export class CreateCreditUseCase implements Executable {
  constructor(
    @Inject("CreditsService")
    private readonly creditsService: CreditsService
  ) {}

  public async execute(payload: CreateCreditContract): Promise<CreditEntity> {
    const existingCredits = await this.creditsService.findByCustomerId(
      payload.customerId
    );

    if (existingCredits.length > 0) {
      throw new CreditAlreadyExistsException(existingCredits.at(0)!.getId());
    }

    const credit = await this.creditsService.create(
      CreditEntity.createToPrimitives(payload)
    );

    return credit;
  }
}
