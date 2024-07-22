import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CreditsService } from "@/credits/domain/contracts/credits.service";
import type { CreditEntity } from "@/credits/domain/entities/credit.entity";
import { CreditNotFoundException } from "@/credits/domain/exceptions/credit-not-found.exception";
import type { Credit } from "@/credits/domain/interfaces/credit.interface";

@Injectable()
export class UpdateCreditUseCase implements Executable {
  constructor(
    @Inject("CreditsService")
    private readonly creditsService: CreditsService
  ) {}

  public async execute(
    creditId: string,
    creditPayload: Partial<Credit>
  ): Promise<CreditEntity> {
    const credit = await this.creditsService.get(creditId);

    if (!credit) {
      throw new CreditNotFoundException(creditId);
    }

    const { limit, balance } = creditPayload;

    const updatedCredit = await this.creditsService.update(creditId, {
      limit,
      balance,
    });

    return updatedCredit;
  }
}
