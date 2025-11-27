import type { Category } from '../services/categoryService';

export interface CategorySummary {
  category_id: number;
  category_name: string;
  category_color: string;
  category_icon: string;
  total_amount: number;
  month: string;
  year: number;
  transaction_count?: number;
  average_amount?: number;
}

export interface CategorySummaryWithDetails extends CategorySummary {
  category?: Category;
}