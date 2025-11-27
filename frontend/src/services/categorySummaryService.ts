import { expenseService } from './expenseService';
import type { Category } from './categoryService';
import type { CategorySummary, CategoryTypeSummary } from '../types/categorySummary';

const getColorForCategoryType = (typeName: string): string => {
  const colorMap: { [key: string]: string } = {
    'Gastos fijos': '#EF4444',
    'Ahorro': '#10B981',
    'Gastos variables': '#F59E0B',
  };

  return colorMap[typeName] || '#6B7280';
};

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
            category_type_id: expense.category?.category_type_id || 0,
            category_type_name: expense.category?.category_type?.name || 'Sin tipo',
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
  ): Promise<CategorySummary[]> {
    try {
      const summary = await this.getMonthlySummary(month, year);

      return summary.map(item => {
        const category = categories.find(cat => cat.id === item.category_id);
        return {
          ...item,
          category_name: category?.name || item.category_name,
          category_color: category?.color || item.category_color,
          category_icon: category?.icon || item.category_icon,
          category_type_id: category?.category_type_id || item.category_type_id,
          category_type_name: category?.category_type?.name || item.category_type_name
        };
      });
    } catch (error) {
      console.error('Error getting category summary with categories:', error);
      throw error;
    }
  },

  async getCategoryTypeSummary(month?: number, year?: number): Promise<CategoryTypeSummary[]> {
  try {
    const summary = await this.getMonthlySummary(month, year);

    const typeMap = new Map();
    let totalAmount = 0;

    for (const item of summary) {
      totalAmount += item.total_amount;
      const typeId = item.category_type_id;
      const typeName = item.category_type_name;

      if (!typeMap.has(typeId)) {
        typeMap.set(typeId, {
          category_type_id: typeId,
          category_type_name: typeName,
          total_amount: 0,
          color: getColorForCategoryType(typeName)
        });
      }

      typeMap.get(typeId).total_amount += item.total_amount;
    }

    const result = Array.from(typeMap.values()).map(type => ({
      ...type,
      percentage: totalAmount > 0 ? (type.total_amount / totalAmount) * 100 : 0
    }));

    return result.sort((a, b) => b.total_amount - a.total_amount);
  } catch (error) {
    console.error('Error getting category type summary:', error);
    throw error;
  }
},

  async getCompleteMonthlySummary(month?: number, year?: number): Promise<{
    categorySummary: CategorySummary[];
    categoryTypeSummary: CategoryTypeSummary[];
    totalMonthly: number;
  }> {
    try {
      const [categorySummary, categoryTypeSummary] = await Promise.all([
        this.getMonthlySummary(month, year),
        this.getCategoryTypeSummary(month, year)
      ]);

      const totalMonthly = categorySummary.reduce((sum, item) => sum + item.total_amount, 0);

      return {
        categorySummary,
        categoryTypeSummary,
        totalMonthly
      };
    } catch (error) {
      console.error('Error getting complete monthly summary:', error);
      throw error;
    }
  }
};