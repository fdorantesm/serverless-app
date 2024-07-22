import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CreditsService } from "@/credits/domain/contracts/credits.service";
import type { CreditEntity } from "@/credits/domain/entities/credit.entity";
import { CreditNotFoundException } from "@/credits/domain/exceptions/credit-not-found.exception";

@Injectable()
export class GetCreditUseCase implements Executable {
  constructor(
    @Inject("CreditsService")
    private readonly creditsService: CreditsService
  ) {}

  public async execute(creditId: string): Promise<CreditEntity> {
    const credit = await this.creditsService.get(creditId);

    if (!credit) {
      throw new CreditNotFoundException(creditId);
    }

    return credit;
  }
}
