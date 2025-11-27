import { useState, useEffect, useCallback } from 'react';
import { categorySummaryService } from '../services/categorySummaryService';
import type { Category } from '../services/categoryService';
import type { CategorySummary } from '../types/categorySummary';
import { categoryService } from '../services/categoryService';

export const useCategorySummary = (month?: number, year?: number) => {
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalMonthly, setTotalMonthly] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, summaryData] = await Promise.all([
        categoryService.getAll(),
        categorySummaryService.getMonthlySummary(month, year)
      ]);

      setCategories(categoriesData);
      setSummary(summaryData);

      const total = summaryData.reduce((sum, item) => sum + item.total_amount, 0);
      setTotalMonthly(total);

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

  const refetch = () => loadData();

  return {
    summary,
    categories,
    loading,
    error,
    totalMonthly,
    refetch
  };
};