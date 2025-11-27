export interface BalanceData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactions: Transaction[];
  runningBalance: number[];
}

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  source: string;
  date: string;
  color: string;
  icon: string;
  created_at?: string;
}

export interface IncomeFormData {
  amount: number;
  income_source_id: number;
  description: string;
  income_date: string;
}

export interface ExpenseFormData {
  amount: number;
  category_id: number;
  description: string;
  expense_date: string;
}

export type TransactionFormData = IncomeFormData | ExpenseFormData;