import { useState, useEffect, useCallback } from 'react';
import { categorySummaryService } from '../services/categorySummaryService';
import type { CategorySummary, CategoryTypeSummary } from '../types/categorySummary';
import type { Category } from '../services/categoryService';
import { categoryService } from '../services/categoryService';

interface UseCategorySummaryReturn {
  summary: CategorySummary[];
  categoryTypeSummary: CategoryTypeSummary[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  totalMonthly: number;
}

export const useCategorySummary = (month?: number, year?: number): UseCategorySummaryReturn => {
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [categoryTypeSummary, setCategoryTypeSummary] = useState<CategoryTypeSummary[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalMonthly, setTotalMonthly] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, completeSummary] = await Promise.all([
        categoryService.getAll(),
        categorySummaryService.getCompleteMonthlySummary(month, year)
      ]);

      setCategories(categoriesData);
      setSummary(completeSummary.categorySummary);
      setCategoryTypeSummary(completeSummary.categoryTypeSummary);
      setTotalMonthly(completeSummary.totalMonthly);

    } catch (err) {
      setError('Error al cargar el resumen por categoría');
      console.error('Error loading category summary:', err);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    summary,
    categoryTypeSummary,
    categories,
    loading,
    error,
    totalMonthly,
  };
};