import { useState, useEffect, useCallback } from 'react';
import type { IncomeSource } from '../services/incomeSourceService';
import type { Category } from '../services/categoryService';
import { incomeService } from '../services/incomeService';
import { expenseService } from '../services/expenseService';
import { incomeSourceService } from '../services/incomeSourceService';
import { categoryService } from '../services/categoryService';
import { BalanceDropdown } from '../components/dropdown/BalanceDropdown';
import { Modal } from '../components/modal/Modal';
import { CreateIncomeModal } from '../components/modal/CreateIncomeModal';
import { CreateExpenseModal } from '../components/modal/CreateExpenseModal';
import { ConfirmModal } from '../components/modal/ConfirmModal';
import { TransactionsTable } from '../components/list/TransactionsTable';

interface BalanceData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactions: Transaction[];
  runningBalance: number[];
}

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  source: string;
  date: string;
  color: string;
  icon: string;
  created_at?: string;
}

const safeParseNumber = (value: string | number | null | undefined): number => {
    if (value === null || value === undefined) return 0;

    if (typeof value === 'string') {
      if (value.includes('e')) {
        return Number.parseFloat(value);
      }
      return Number.parseFloat(value);
    }

    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  };

const calculateRunningBalance = (transactions: Transaction[]): number[] => {
  if (transactions.length === 0) return [];

  const chronological = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  }).reverse();

  let runningBalance = 0;
  const balanceMap = new Map();

  for (const transaction of chronological) {
    if (transaction.type === 'income') {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }
    balanceMap.set(transaction.id, runningBalance);
  }

  return transactions.map(transaction => balanceMap.get(transaction.id) || 0);
};

export const Balance = () => {
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

  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isSubmittingIncome, setIsSubmittingIncome] = useState(false);
  const [isSubmittingExpense, setIsSubmittingExpense] = useState(false);

  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);


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
    const balanceMap = new Map();
    const chronologicalTransactions = [...transactions].sort((a, b) => {
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison === 0 && a.created_at && b.created_at) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return dateComparison;
    }).reverse();

    for (const [index, transaction] of chronologicalTransactions.entries()) {
      balanceMap.set(transaction.id, runningBalance[index]);
    }

    const tableRunningBalance = transactions.map(transaction =>
      balanceMap.get(transaction.id) || 0
    );

    setBalanceData({
      totalIncome,
      totalExpense,
      balance,
      transactions,
      runningBalance: tableRunningBalance
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

  const handleAddIncome = async (incomeData: {
  amount: number;
  income_source_id: number;
  description: string;
  income_date: string;
}) => {
  try {
    setIsSubmittingIncome(true);
    setError(null);

    await incomeService.create(incomeData);
    await loadData();

    setIsAddingIncome(false);
  } catch (err) {
    setError('Error al crear el ingreso');
    console.error('Error creating income:', err);
  } finally {
    setIsSubmittingIncome(false);
  }
};

const handleAddExpense = async (expenseData: {
  amount: number;
  category_id: number;
  description: string;
  expense_date: string;
}) => {
  try {
    setIsSubmittingExpense(true);
    setError(null);

    await expenseService.create(expenseData);
    await loadData();

    setIsAddingExpense(false);
  } catch (err) {
    setError('Error al crear el gasto');
    console.error('Error creating expense:', err);
  } finally {
    setIsSubmittingExpense(false);
  }
};

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando balance...</p>
        </div>
      </div>
    );
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    if (transaction.type === 'income') {
      setIsEditingIncome(true);
    } else {
      setIsEditingExpense(true);
    }
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setDeletingTransaction(transaction);
    setIsDeleting(true);
  };

  const handleEditIncome = async (incomeData: {
    amount: number;
    income_source_id: number;
    description: string;
    income_date: string;
  }) => {
    if (!editingTransaction) return;

    try {
      setIsSubmittingEdit(true);
      setError(null);

      await incomeService.update(editingTransaction.id, incomeData);
      await loadData();

      setIsEditingIncome(false);
      setEditingTransaction(null);
    } catch (err) {
      setError('Error al actualizar el ingreso');
      console.error('Error updating income:', err);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleEditExpense = async (expenseData: {
    amount: number;
    category_id: number;
    description: string;
    expense_date: string;
  }) => {
    if (!editingTransaction) return;

    try {
      setIsSubmittingEdit(true);
      setError(null);

      await expenseService.update(editingTransaction.id, expenseData);
      await loadData();

      setIsEditingExpense(false);
      setEditingTransaction(null);
    } catch (err) {
      setError('Error al actualizar el gasto');
      console.error('Error updating expense:', err);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteTransactionConfirm = async () => {
    if (!deletingTransaction) return;

    try {
      setIsSubmittingDelete(true);
      setError(null);

      if (deletingTransaction.type === 'income') {
        await incomeService.delete(deletingTransaction.id);
      } else {
        await expenseService.delete(deletingTransaction.id);
      }

      await loadData();

      setIsDeleting(false);
      setDeletingTransaction(null);
    } catch (err) {
      setError('Error al eliminar la transacción');
      console.error('Error deleting transaction:', err);
    } finally {
      setIsSubmittingDelete(false);
    }
  };

  return (
    <div className="min-h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Balance Financiero</h1>
          <p className="text-gray-600">Resumen de tus ingresos y gastos</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
          <BalanceDropdown
            onAddIncome={() => setIsAddingIncome(true)}
            onAddExpense={() => setIsAddingExpense(true)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <Modal
        isOpen={isAddingIncome}
        onClose={() => setIsAddingIncome(false)}
        title="Crear Nuevo Ingreso"
        size="md"
      >
        <CreateIncomeModal
          onSubmit={handleAddIncome}
          onClose={() => setIsAddingIncome(false)}
          isSubmitting={isSubmittingIncome}
          incomeSources={incomeSources}
        />
      </Modal>

      <Modal
        isOpen={isAddingExpense}
        onClose={() => setIsAddingExpense(false)}
        title="Crear Nuevo Gasto"
        size="md"
      >
        <CreateExpenseModal
          onSubmit={handleAddExpense}
          onClose={() => setIsAddingExpense(false)}
          isSubmitting={isSubmittingExpense}
          categories={categories}
        />
      </Modal>

      <Modal
        isOpen={isEditingIncome}
        onClose={() => {
          setIsEditingIncome(false);
          setEditingTransaction(null);
        }}
        title="Editar Ingreso"
        size="md"
      >
        <CreateIncomeModal
          key={editingTransaction?.id || 'create'}
          onSubmit={handleEditIncome}
          onClose={() => {
            setIsEditingIncome(false);
            setEditingTransaction(null);
          }}
          isSubmitting={isSubmittingEdit}
          initialData={editingTransaction ? {
            amount: editingTransaction.amount,
            income_source_id: incomeSources.find(source => source.name === editingTransaction.source)?.id || 0,
            description: editingTransaction.description,
            income_date: editingTransaction.date
          } : undefined}
          incomeSources={incomeSources}
        />
      </Modal>

      <Modal
        isOpen={isEditingExpense}
        onClose={() => {
          setIsEditingExpense(false);
          setEditingTransaction(null);
        }}
        title="Editar Gasto"
        size="md"
      >
        <CreateExpenseModal
          key={editingTransaction?.id || 'create'}
          onSubmit={handleEditExpense}
          onClose={() => {
            setIsEditingExpense(false);
            setEditingTransaction(null);
          }}
          isSubmitting={isSubmittingEdit}
          initialData={editingTransaction ? {
            amount: editingTransaction.amount,
            category_id: categories.find(cat => cat.name === editingTransaction.source)?.id || 0,
            description: editingTransaction.description,
            expense_date: editingTransaction.date
          } : undefined}
          categories={categories}
        />
      </Modal>

      <Modal
        isOpen={isDeleting}
        onClose={() => {
          setIsDeleting(false);
          setDeletingTransaction(null);
        }}
        title="Eliminar Transacción"
        size="sm"
      >
        <ConfirmModal
          message={`¿Estás seguro de que quieres eliminar la transacción "${deletingTransaction?.description}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDeleteTransactionConfirm}
          onCancel={() => {
            setIsDeleting(false);
            setDeletingTransaction(null);
          }}
          isSubmitting={isSubmittingDelete}
          variant="delete"
        />
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos totales</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(balanceData.totalIncome)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-arrow-down text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gastos totales</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(balanceData.totalExpense)}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <i className="fas fa-arrow-up text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
          balanceData.balance >= 0 ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${
                balanceData.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(balanceData.balance)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              balanceData.balance >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <i className={`fas ${
                balanceData.balance >= 0 ? 'fa-chart-line text-green-600' : 'fa-chart-line text-red-600'
              } text-xl`}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Transacciones recientes</h2>
        </div>
        <TransactionsTable
          transactions={balanceData.transactions}
          runningBalance={balanceData.runningBalance}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};