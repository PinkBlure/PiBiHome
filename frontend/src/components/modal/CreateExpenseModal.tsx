import { useState } from 'react';
import type { Category } from '../../services/categoryService';
import { Form } from '../form/Form';
import { FormField } from '../form/FormField';
import { Input } from '../form/Input';
import { Textarea } from '../form/Textarea';
import { Select } from '../form/Select';
import { FormActions } from '../form/FormActions';

interface CreateExpenseModalProps {
  onSubmit: (expense: {
    amount: number;
    category_id: number;
    description: string;
    expense_date: string;
  }) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
  initialData?: {
    amount?: number;
    category_id?: number;
    description?: string;
    expense_date?: string;
  };
  categories: Category[];
}

export const CreateExpenseModal = ({
  onSubmit,
  onClose,
  isSubmitting = false,
  initialData,
  categories
}: CreateExpenseModalProps) => {
  const [formData, setFormData] = useState(() => ({
    amount: initialData?.amount?.toString() || '',
    category_id: initialData?.category_id || '',
    description: initialData?.description || '',
    expense_date: initialData?.expense_date || new Date().toISOString().split('T')[0]
  }));

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Debes seleccionar una categoría';
    }

    if (!formData.expense_date) {
      newErrors.expense_date = 'La fecha es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit({
      amount: Number.parseFloat(formData.amount),
      category_id: Number(formData.category_id),
      description: formData.description,
      expense_date: formData.expense_date
    });
  };

  const isFormValid = formData.amount &&
                     Number.parseFloat(formData.amount) > 0 &&
                     formData.category_id &&
                     formData.expense_date;

  const isEditing = Boolean(initialData);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Monto"
        htmlFor="expense-amount"
        required
        error={errors.amount}
      >
        <Input
          id="expense-amount"
          type="number"
          value={formData.amount}
          onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
          placeholder="0.00"
          disabled={isSubmitting}
          min="0"
          step="0.01"
        />
      </FormField>

      <FormField
        label="Categoría"
        htmlFor="expense-category"
        required
        error={errors.category_id}
      >
        <Select
          id="expense-category"
          value={formData.category_id.toString()}
          onChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
          disabled={isSubmitting}
          options={[
            { value: '', label: 'Selecciona una categoría', disabled: true },
            ...categories.map(category => ({
              value: category.id.toString(),
              label: category.name
            }))
          ]}
        />
      </FormField>

      <FormField
        label="Fecha"
        htmlFor="expense-date"
        required
        error={errors.expense_date}
      >
        <Input
          id="expense-date"
          type="date"
          value={formData.expense_date}
          onChange={(value) => setFormData(prev => ({ ...prev, expense_date: value }))}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="expense-description"
      >
        <Textarea
          id="expense-description"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Descripción del gasto (opcional)"
          disabled={isSubmitting}
          rows={3}
        />
      </FormField>

      <FormActions
        submitLabel={isEditing ? "Actualizar gasto" : "Crear gasto"}
        cancelLabel="Cancelar"
        onCancel={onClose}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isFormValid}
      />
    </Form>
  );
};