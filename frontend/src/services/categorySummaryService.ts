import { expenseService } from './expenseService';
import type { Category } from './categoryService';
import type { CategorySummary, CategorySummaryWithDetails } from '../types/categorySummary';

export const categorySummaryService = {
  async getMonthlySummary(month?: number, year?: number): Promise<CategorySummary[]> {
    try {
      const currentDate = new Date();
      const targetMonth = month || currentDate.getMonth() + 1;
      const targetYear = year || currentDate.getFullYear();

      const expenses = await expenseService.getAll();

      const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.expense_date);
        return expenseDate.getMonth() + 1 === targetMonth &&
               expenseDate.getFullYear() === targetYear;
      });

      const summaryMap = new Map();

      for (const expense of monthlyExpenses) {
        const key = expense.category_id;

        if (!summaryMap.has(key)) {
          summaryMap.set(key, {
            category_id: expense.category_id,
            category_name: expense.category?.name || 'Sin categoría',
            category_color: expense.category?.color || '#6B7280',
            category_icon: expense.category?.icon || 'fas fa-question',
            total_amount: 0,
            month: targetMonth.toString().padStart(2, '0'),
            year: targetYear
          });
        }

        summaryMap.get(key).total_amount += Number(expense.amount);
      }

      return Array.from(summaryMap.values()).sort((a, b) => b.total_amount - a.total_amount);
    } catch (error) {
      console.error('Error getting category summary:', error);
      throw error;
    }
  },

  async getMonthlySummaryWithCategories(
    categories: Category[],
    month?: number,
    year?: number
  ): Promise<CategorySummaryWithDetails[]> {
    try {
      const summary = await this.getMonthlySummary(month, year);

      return summary.map(item => {
        const category = categories.find(cat => cat.id === item.category_id);
        return {
          ...item,
          category_name: category?.name || item.category_name,
          category_color: category?.color || item.category_color,
          category_icon: category?.icon || item.category_icon,
          category: category
        };
      });
    } catch (error) {
      console.error('Error getting category summary with categories:', error);
      throw error;
    }
  }
};