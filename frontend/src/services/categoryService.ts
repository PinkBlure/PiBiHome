import { api } from './api';

export interface CategoryType {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  category_type_id: number;
  category_type?: CategoryType;
  color: string;
  icon: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryData {
  name: string;
  category_type_id: number;
  color: string;
  icon: string;
  description?: string;
}

export interface CreateCategoryTypeData {
  name: string;
  description?: string;
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategoryTypes: async (): Promise<CategoryType[]> => {
    const response = await api.get('/category_types');
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  create: async (category: CreateCategoryData): Promise<Category> => {
    const response = await api.post('/categories', category);
    return response.data;
  },

  update: async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },

  createCategoryType: async (categoryType: CreateCategoryTypeData): Promise<CategoryType> => {
    const response = await api.post('/category_types', categoryType);
    return response.data;
  },

  updateCategoryType: async (id: number, categoryType: Partial<CategoryType>): Promise<CategoryType> => {
    const response = await api.put(`/category_types/${id}`, categoryType);
    return response.data;
  },

  deleteCategoryType: async (id: number): Promise<void> => {
    await api.delete(`/category_types/${id}`);
  },
};