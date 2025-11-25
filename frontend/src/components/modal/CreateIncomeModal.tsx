import { useState } from 'react';
import type { IncomeSource } from '../../services/incomeSourceService';
import { Form } from '../form/Form';
import { FormField } from '../form/FormField';
import { Input } from '../form/Input';
import { Textarea } from '../form/Textarea';
import { Select } from '../form/Select';
import { FormActions } from '../form/FormActions';

interface CreateIncomeModalProps {
  onSubmit: (income: {
    amount: number;
    income_source_id: number;
    description: string;
    income_date: string;
  }) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
  initialData?: {
    amount?: number;
    income_source_id?: number;
    description?: string;
    income_date?: string;
  };
  incomeSources: IncomeSource[];
}

export const CreateIncomeModal = ({
  onSubmit,
  onClose,
  isSubmitting = false,
  initialData,
  incomeSources
}: CreateIncomeModalProps) => {
  const [formData, setFormData] = useState(() => ({
    amount: initialData?.amount?.toString() || '',
    income_source_id: initialData?.income_source_id || '',
    description: initialData?.description || '',
    income_date: initialData?.income_date || new Date().toISOString().split('T')[0]
  }));

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const valiincome_dateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }

    if (!formData.income_source_id) {
      newErrors.income_source_id = 'Debes seleccionar una fuente de ingreso';
    }

    if (!formData.income_date) {
      newErrors.income_date = 'La fecha es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!valiincome_dateForm()) return;

    await onSubmit({
      amount: Number.parseFloat(formData.amount),
      income_source_id: Number(formData.income_source_id),
      description: formData.description,
      income_date: formData.income_date
    });
  };

  const isFormValid = formData.amount &&
                     Number.parseFloat(formData.amount) > 0 &&
                     formData.income_source_id &&
                     formData.income_date;

  const isEditing = Boolean(initialData);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Cantidad"
        htmlFor="income-amount"
        required
        error={errors.amount}
      >
        <Input
          id="income-amount"
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
        label="Fuente de ingreso"
        htmlFor="income-source"
        required
        error={errors.income_source_id}
      >
        <Select
          id="income-source"
          value={formData.income_source_id.toString()}
          onChange={(value) => setFormData(prev => ({ ...prev, income_source_id: value }))}
          disabled={isSubmitting}
          options={[
            { value: '', label: 'Selecciona una fuente', disabled: true },
            ...incomeSources.map(source => ({
              value: source.id.toString(),
              label: source.name
            }))
          ]}
        />
      </FormField>

      <FormField
        label="Fecha"
        htmlFor="income-income_date"
        required
        error={errors.income_date}
      >
        <Input
          id="income-income_date"
          type="income_date"
          value={formData.income_date}
          onChange={(value) => setFormData(prev => ({ ...prev, income_date: value }))}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="income-description"
      >
        <Textarea
          id="income-description"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Descripción del ingreso (opcional)"
          disabled={isSubmitting}
          rows={3}
        />
      </FormField>

      <FormActions
        submitLabel={isEditing ? "Actualizar ingreso" : "Crear ingreso"}
        cancelLabel="Cancelar"
        onCancel={onClose}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isFormValid}
      />
    </Form>
  );
};