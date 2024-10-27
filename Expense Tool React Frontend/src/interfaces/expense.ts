export interface Expense {
  id: number;
  date: string;
  expenseType: string;
  description: string;
  amount: number;
  currency: string;
  createdAt: Date;
  lastUpdated: Date;
}

export interface CreateExpenseDto {
  date: string;
  expenseType: string;
  description: string;
  amount: number;
  currency: string;
}

export interface ExpenseListDto {
  items: Expense[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
