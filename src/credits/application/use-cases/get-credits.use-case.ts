import type { Executable } from "@/core/domain/interfaces/executable.interface";
import { Inject, Injectable } from "@/core/injection";
import type { CreditsService } from "@/credits/domain/contracts/credits.service";
import type { CreditEntity } from "@/credits/domain/entities/credit.entity";

@Injectable()
export class GetCreditsUseCase implements Executable {
  constructor(
    @Inject("CreditsService")
    private readonly creditsService: CreditsService
  ) {}

  public execute(customerId: string): Promise<CreditEntity[]> {
    return this.creditsService.findByCustomerId(customerId);
  }
}
