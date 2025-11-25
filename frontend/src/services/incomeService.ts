import { api } from './api';
import type { IncomeSource } from './incomeSourceService';

export interface Income {
  id: number;
  amount: number;
  income_source_id: number;
  income_source?: IncomeSource;
  description?: string;
  income_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateIncomeData {
  amount: number;
  income_source_id: number;
  description?: string;
  income_date: string;
}

export interface UpdateIncomeData {
  amount?: number;
  income_source_id?: number;
  description?: string;
  income_date?: string;
}

export const incomeService = {
  getAll: async (): Promise<Income[]> => {
    const response = await api.get('/incomes');
    return response.data;
  },

  getById: async (id: number): Promise<Income> => {
    const response = await api.get(`/incomes/${id}`);
    return response.data;
  },

  create: async (income: CreateIncomeData): Promise<Income> => {
    const response = await api.post('/incomes', {
      income: {
        amount: income.amount,
        income_source_id: income.income_source_id,
        description: income.description,
        income_date: income.income_date
      }
    });
    return response.data;
  },

  update: async (id: number, income: UpdateIncomeData): Promise<Income> => {
    const response = await api.put(`/incomes/${id}`, {
      income: {
        amount: income.amount,
        income_source_id: income.income_source_id,
        description: income.description,
        income_date: income.income_date
      }
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/incomes/${id}`);
  },
};