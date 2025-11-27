import React from 'react';
import { useBalance } from '../hooks/useBalance';
import { BalanceHeader } from '../components/layout/balance/BalanceHeader';
import { BalanceCards } from '../components/card/BalanceCards';
import { BalanceModals } from '../components/modal/BalanceModals';
import { TransactionsTable } from '../components/list/TransactionsTable';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { incomeService } from '../services/incomeService';
import { expenseService } from '../services/expenseService';
import type { Transaction, IncomeFormData, ExpenseFormData } from '../types/balance';

export const Balance: React.FC = () => {
  const {
    incomeSources,
    categories,
    loading,
    error,
    balanceData,
    refetch,
    setError
  } = useBalance();

  const [isAddingIncome, setIsAddingIncome] = React.useState(false);
  const [isAddingExpense, setIsAddingExpense] = React.useState(false);
  const [isSubmittingIncome, setIsSubmittingIncome] = React.useState(false);
  const [isSubmittingExpense, setIsSubmittingExpense] = React.useState(false);

  const [isEditingIncome, setIsEditingIncome] = React.useState(false);
  const [isEditingExpense, setIsEditingExpense] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = React.useState(false);

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deletingTransaction, setDeletingTransaction] = React.useState<Transaction | null>(null);
  const [isSubmittingDelete, setIsSubmittingDelete] = React.useState(false);

  const handleAddIncome = async (incomeData: IncomeFormData) => {
    try {
      setIsSubmittingIncome(true);
      setError(null);
      await incomeService.create(incomeData);
      await refetch();
      setIsAddingIncome(false);
    } catch (err) {
      setError('Error al crear el ingreso');
      console.error('Error creating income:', err);
    } finally {
      setIsSubmittingIncome(false);
    }
  };

  const handleAddExpense = async (expenseData: ExpenseFormData) => {
    try {
      setIsSubmittingExpense(true);
      setError(null);
      await expenseService.create(expenseData);
      await refetch();
      setIsAddingExpense(false);
    } catch (err) {
      setError('Error al crear el gasto');
      console.error('Error creating expense:', err);
    } finally {
      setIsSubmittingExpense(false);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    if (transaction.type === 'income') {
      setIsEditingIncome(true);
    } else {
      setIsEditingExpense(true);
    }
  };

  const handleEditIncome = async (incomeData: IncomeFormData) => {
    if (!editingTransaction) return;
    try {
      setIsSubmittingEdit(true);
      setError(null);
      await incomeService.update(editingTransaction.id, incomeData);
      await refetch();
      setIsEditingIncome(false);
      setEditingTransaction(null);
    } catch (err) {
      setError('Error al actualizar el ingreso');
      console.error('Error updating income:', err);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleEditExpense = async (expenseData: ExpenseFormData) => {
    if (!editingTransaction) return;
    try {
      setIsSubmittingEdit(true);
      setError(null);
      await expenseService.update(editingTransaction.id, expenseData);
      await refetch();
      setIsEditingExpense(false);
      setEditingTransaction(null);
    } catch (err) {
      setError('Error al actualizar el gasto');
      console.error('Error updating expense:', err);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setDeletingTransaction(transaction);
    setIsDeleting(true);
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
      await refetch();
      setIsDeleting(false);
      setDeletingTransaction(null);
    } catch (err) {
      setError('Error al eliminar la transacción');
      console.error('Error deleting transaction:', err);
    } finally {
      setIsSubmittingDelete(false);
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
    return <LoadingSpinner message="Cargando balance..." />;
  }

  return (
    <div className="min-h-full">
      <BalanceHeader
        onAddIncome={() => setIsAddingIncome(true)}
        onAddExpense={() => setIsAddingExpense(true)}
      />

      {error && <ErrorMessage message={error} />}

      <BalanceModals
        isAddingIncome={isAddingIncome}
        isAddingExpense={isAddingExpense}
        isEditingIncome={isEditingIncome}
        isEditingExpense={isEditingExpense}
        isDeleting={isDeleting}
        isSubmittingIncome={isSubmittingIncome}
        isSubmittingExpense={isSubmittingExpense}
        isSubmittingEdit={isSubmittingEdit}
        isSubmittingDelete={isSubmittingDelete}
        editingTransaction={editingTransaction}
        deletingTransaction={deletingTransaction}
        incomeSources={incomeSources}
        categories={categories}
        onAddIncome={handleAddIncome}
        onAddExpense={handleAddExpense}
        onEditIncome={handleEditIncome}
        onEditExpense={handleEditExpense}
        onDeleteTransaction={handleDeleteTransactionConfirm}
        onCloseIncome={() => setIsAddingIncome(false)}
        onCloseExpense={() => setIsAddingExpense(false)}
        onCloseEditIncome={() => {
          setIsEditingIncome(false);
          setEditingTransaction(null);
        }}
        onCloseEditExpense={() => {
          setIsEditingExpense(false);
          setEditingTransaction(null);
        }}
        onCloseDelete={() => {
          setIsDeleting(false);
          setDeletingTransaction(null);
        }}
      />

      <BalanceCards
        totalIncome={balanceData.totalIncome}
        totalExpense={balanceData.totalExpense}
        balance={balanceData.balance}
        formatCurrency={formatCurrency}
      />

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