import { Inject, Injectable } from "@/core/injection";

import type { CreditsRepository } from "@/credits/domain/contracts/credits.repository";
import type { CreditEntity } from "@/credits/domain/entities/credit.entity";

@Injectable()
export class CreditsService {
  constructor(
    @Inject("CreditsRepository")
    private readonly creditsRepository: CreditsRepository
  ) {}

  public async create(data: any): Promise<CreditEntity | undefined> {
    return this.creditsRepository.create(data);
  }

  public async list(): Promise<CreditEntity[]> {
    return this.creditsRepository.list();
  }

  public async get(id: string): Promise<CreditEntity | undefined> {
    return this.creditsRepository.get(id);
  }

  public async update(
    id: string,
    data: any
  ): Promise<CreditEntity | undefined> {
    return this.creditsRepository.update(id, data);
  }

  public async delete(id: string): Promise<boolean> {
    return this.creditsRepository.delete(id);
  }

  public async findByCustomerId(customerId: string): Promise<CreditEntity[]> {
    return this.creditsRepository.findByCustomerId(customerId);
  }
}
