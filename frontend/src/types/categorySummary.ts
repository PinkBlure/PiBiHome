import type { Category } from '../services/categoryService';

export interface CategorySummary {
  category_id: number;
  category_name: string;
  category_color: string;
  category_icon: string;
  category_type_id: number;
  category_type_name: string;
  total_amount: number;
  month: string;
  year: number;
  transaction_count?: number;
  average_amount?: number;
}

export interface CategoryTypeSummary {
  category_type_id: number;
  category_type_name: string;
  total_amount: number;
  percentage: number;
  color: string;
  icon?: string;
}

export interface CategorySummaryWithDetails extends CategorySummary {
  category?: Category;
}