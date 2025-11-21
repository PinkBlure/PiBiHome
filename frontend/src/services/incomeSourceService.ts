import { api } from './api';

export interface IncomeSource {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const incomeSourceService = {
  getAll: async (): Promise<IncomeSource[]> => {
    const response = await api.get<IncomeSource[]>('/income_sources');
    return response.data;
  },

  getById: async (id: number): Promise<IncomeSource> => {
    const response = await api.get<IncomeSource>(`/income_sources/${id}`);
    return response.data;
  },

  create: async (incomeSourceData: { name: string; description?: string }): Promise<IncomeSource> => {
    const response = await api.post<IncomeSource>('/income_sources', {
      income_source: incomeSourceData
    });
    return response.data;
  },

  update: async (id: number, incomeSourceData: { name: string; description?: string }): Promise<IncomeSource> => {
    const response = await api.put<IncomeSource>(`/income_sources/${id}`, {
      income_source: incomeSourceData
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/income_sources/${id}`);
  }
};