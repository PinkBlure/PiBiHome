import { useState, useEffect, useCallback } from 'react';
import type { IncomeSource } from '../services/incomeSourceService';
import type { Category } from '../services/categoryService';
import { incomeService } from '../services/incomeService';
import { expenseService } from '../services/expenseService';
import { incomeSourceService } from '../services/incomeSourceService';
import { categoryService } from '../services/categoryService';
import type { BalanceData, Transaction } from '../types/balance';

const safeParseNumber = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined) return 0;

  if (typeof value === 'string') {
    return Number.parseFloat(value);
  }

  const num = Number(value);
  return Number.isNaN(num) ? 0 : num;
};

const calculateRunningBalance = (transactions: Transaction[]): number[] => {
  if (transactions.length === 0) return [];

  const chronologicalTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }

    if (a.created_at && b.created_at) {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }

    return 0;
  });

  let runningBalance = 0;
  const runningBalances: number[] = [];

  for (const transaction of chronologicalTransactions) {
    if (transaction.type === 'income') {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }
    runningBalances.push(runningBalance);
  }

  const balanceMap = new Map();
  let index = 0;
  for (const transaction of chronologicalTransactions) {
    balanceMap.set(transaction.id, runningBalances[index]);
    index++;
  }

  return transactions.map(transaction => balanceMap.get(transaction.id) || 0);
};

export const useBalance = () => {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balanceData, setBalanceData] = useState<BalanceData>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: [],
    runningBalance: []
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [incomesData, expensesData, incomeSourcesData, categoriesData] = await Promise.all([
        incomeService.getAll(),
        expenseService.getAll(),
        incomeSourceService.getAll(),
        categoryService.getAll()
      ]);

      setIncomeSources(incomeSourcesData);
      setCategories(categoriesData);

      const totalIncome = incomesData.reduce((sum, income) => {
        return sum + safeParseNumber(income.amount);
      }, 0);

      const totalExpense = expensesData.reduce((sum, expense) => {
        return sum + safeParseNumber(expense.amount);
      }, 0);

      const balance = totalIncome - totalExpense;

      const transactions: Transaction[] = [
        ...incomesData.map(income => ({
          id: income.id,
          type: 'income' as const,
          amount: safeParseNumber(income.amount),
          description: income.description || 'Ingreso',
          source: incomeSourcesData.find(source => source.id === income.income_source_id)?.name || 'Fuente desconocida',
          date: income.income_date,
          color: '#10B981',
          icon: 'fas fa-arrow-down',
          created_at: income.created_at
        })),
        ...expensesData.map(expense => ({
          id: expense.id,
          type: 'expense' as const,
          amount: safeParseNumber(expense.amount),
          description: expense.description || 'Gasto',
          source: categoriesData.find(cat => cat.id === expense.category_id)?.name || 'Categoría desconocida',
          date: expense.expense_date,
          color: categoriesData.find(cat => cat.id === expense.category_id)?.color || '#EF4444',
          icon: categoriesData.find(cat => cat.id === expense.category_id)?.icon || 'fas fa-arrow-up',
          created_at: expense.created_at
        }))
      ].sort((a, b) => {
        const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();

        if (dateComparison === 0 && a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }

        return dateComparison;
      });

      const runningBalance = calculateRunningBalance(transactions);

      setBalanceData({
        totalIncome,
        totalExpense,
        balance,
        transactions,
        runningBalance
      });

    } catch (err) {
      setError('Error al cargar los datos del balance');
      console.error('Error loading balance data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    incomeSources,
    categories,
    loading,
    error,
    balanceData,
    refetch: loadData,
    setError
  };
};