export interface Credit {
  id: string;
  currency: string;
  customerId: string;
  limit: number;
  balance: number;
  cutOffDay: number;
  createdAt: Date;
  updatedAt: Date;
}
