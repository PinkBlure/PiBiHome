import { api } from './api';
import type { Category } from './categoryService';

export interface Expense {
  id: number;
  amount: number;
  category_id: number;
  category?: Category;
  description?: string;
  expense_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateExpenseData {
  amount: number;
  category_id: number;
  description?: string;
  expense_date: string;
}

export interface UpdateExpenseData {
  amount?: number;
  category_id?: number;
  description?: string;
  expense_date?: string;
}

export const expenseService = {
  getAll: async (): Promise<Expense[]> => {
    const response = await api.get('/expenses');
    return response.data;
  },

  getById: async (id: number): Promise<Expense> => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  create: async (expense: CreateExpenseData): Promise<Expense> => {
    const response = await api.post('/expenses', {
      expense: {
        amount: expense.amount,
        category_id: expense.category_id,
        description: expense.description,
        expense_date: expense.expense_date
      }
    });
    return response.data;
  },

  update: async (id: number, expense: UpdateExpenseData): Promise<Expense> => {
    const response = await api.put(`/expenses/${id}`, {
      expense: {
        amount: expense.amount,
        category_id: expense.category_id,
        description: expense.description,
        expense_date: expense.expense_date
      }
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },
};