import { inject, injectable } from "inversify";

import type { CreditsRepository } from "@/credits/domain/contracts/credits.repository";
import type { CreditEntity } from "@/credits/domain/entities/credit.entity";

@injectable()
export class CreditsService {
  constructor(
    @inject("CreditsRepository")
    private readonly creditsRepository: CreditsRepository
  ) {}

  public async create(data: any): Promise<any> {
    return this.creditsRepository.create(data);
  }

  public async list(): Promise<CreditEntity[]> {
    return this.creditsRepository.list();
  }

  public async get(id: string): Promise<CreditEntity> {
    return this.creditsRepository.get(id);
  }

  public async update(id: string, data: any): Promise<any> {
    return this.creditsRepository.update(id, data);
  }

  public async delete(id: string): Promise<boolean> {
    return this.creditsRepository.delete(id);
  }
}
