import React from 'react';
import { Modal } from '../modal/Modal';
import { CreateIncomeModal } from '../modal/CreateIncomeModal';
import { CreateExpenseModal } from '../modal/CreateExpenseModal';
import { ConfirmModal } from '../modal/ConfirmModal';
import type { IncomeSource } from '../../services/incomeSourceService';
import type { Category } from '../../services/categoryService';
import type { Transaction, IncomeFormData, ExpenseFormData } from '../../types/balance';

interface BalanceModalsProps {
  isAddingIncome: boolean;
  isAddingExpense: boolean;
  isEditingIncome: boolean;
  isEditingExpense: boolean;
  isDeleting: boolean;

  isSubmittingIncome: boolean;
  isSubmittingExpense: boolean;
  isSubmittingEdit: boolean;
  isSubmittingDelete: boolean;

  editingTransaction: Transaction | null;
  deletingTransaction: Transaction | null;

  incomeSources: IncomeSource[];
  categories: Category[];

  onAddIncome: (data: IncomeFormData) => Promise<void>;
  onAddExpense: (data: ExpenseFormData) => Promise<void>;
  onEditIncome: (data: IncomeFormData) => Promise<void>;
  onEditExpense: (data: ExpenseFormData) => Promise<void>;
  onDeleteTransaction: () => Promise<void>;

  onCloseIncome: () => void;
  onCloseExpense: () => void;
  onCloseEditIncome: () => void;
  onCloseEditExpense: () => void;
  onCloseDelete: () => void;
}

export const BalanceModals: React.FC<BalanceModalsProps> = ({
  isAddingIncome,
  isAddingExpense,
  isEditingIncome,
  isEditingExpense,
  isDeleting,
  isSubmittingIncome,
  isSubmittingExpense,
  isSubmittingEdit,
  isSubmittingDelete,
  editingTransaction,
  deletingTransaction,
  incomeSources,
  categories,
  onAddIncome,
  onAddExpense,
  onEditIncome,
  onEditExpense,
  onDeleteTransaction,
  onCloseIncome,
  onCloseExpense,
  onCloseEditIncome,
  onCloseEditExpense,
  onCloseDelete
}) => {
  return (
    <>
      <Modal
        isOpen={isAddingIncome}
        onClose={onCloseIncome}
        title="Crear Nuevo Ingreso"
        size="md"
      >
        <CreateIncomeModal
          onSubmit={onAddIncome}
          onClose={onCloseIncome}
          isSubmitting={isSubmittingIncome}
          incomeSources={incomeSources}
        />
      </Modal>

      <Modal
        isOpen={isAddingExpense}
        onClose={onCloseExpense}
        title="Crear Nuevo Gasto"
        size="md"
      >
        <CreateExpenseModal
          onSubmit={onAddExpense}
          onClose={onCloseExpense}
          isSubmitting={isSubmittingExpense}
          categories={categories}
        />
      </Modal>

      <Modal
        isOpen={isEditingIncome}
        onClose={onCloseEditIncome}
        title="Editar Ingreso"
        size="md"
      >
        <CreateIncomeModal
          key={editingTransaction?.id || 'create'}
          onSubmit={onEditIncome}
          onClose={onCloseEditIncome}
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
        onClose={onCloseEditExpense}
        title="Editar Gasto"
        size="md"
      >
        <CreateExpenseModal
          key={editingTransaction?.id || 'create'}
          onSubmit={onEditExpense}
          onClose={onCloseEditExpense}
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
        onClose={onCloseDelete}
        title="Eliminar Transacción"
        size="sm"
      >
        <ConfirmModal
          message={`¿Estás seguro de que quieres eliminar la transacción "${deletingTransaction?.description}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={onDeleteTransaction}
          onCancel={onCloseDelete}
          isSubmitting={isSubmittingDelete}
          variant="delete"
        />
      </Modal>
    </>
  );
};