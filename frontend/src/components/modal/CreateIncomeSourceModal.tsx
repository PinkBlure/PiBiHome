import { useState } from 'react';
import { Form } from '../form/Form';
import { FormField } from '../form/FormField';
import { Input } from '../form/Input';
import { Textarea } from '../form/Textarea';
import { FormActions } from '../form/FormActions';

interface CreateIncomeSourceModalProps {
  onSubmit: (incomeSource: { name: string; description: string }) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
  initialData?: { name: string; description: string };
}

export const CreateIncomeSourceModal = ({
  onSubmit,
  onClose,
  isSubmitting = false,
  initialData
}: CreateIncomeSourceModalProps) => {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    description: initialData?.description || ''
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    await onSubmit(formData);
  };

  const isFormValid = formData.name.trim().length > 0;
  const isEditing = Boolean(initialData);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Nombre"
        htmlFor="income-source-name"
        required
      >
        <Input
          id="income-source-name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Ej: Salario, Freelance, Negocio..."
          disabled={isSubmitting}
        />
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="income-source-description"
      >
        <Textarea
          id="income-source-description"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Ej: Ingresos mensuales fijos del trabajo..."
          disabled={isSubmitting}
          rows={3}
        />
      </FormField>

      <FormActions
        submitLabel={isEditing ? "Actualizar fuente" : "Crear fuente"}
        cancelLabel="Cancelar"
        onCancel={onClose}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isFormValid}
      />
    </Form>
  );
};