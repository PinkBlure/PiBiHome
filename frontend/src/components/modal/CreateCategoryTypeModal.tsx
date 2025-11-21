import { useState } from 'react';
import { Form } from '../form/Form';
import { FormField } from '../form/FormField';
import { Input } from '../form/Input';
import { Textarea } from '../form/Textarea';
import { FormActions } from '../form/FormActions';

interface CreateCategoryTypeModalProps {
  onSubmit: (categoryType: { name: string; description: string }) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
  initialData?: { name: string; description: string };
}

export const CreateCategoryTypeModal = ({
  onSubmit,
  onClose,
  isSubmitting = false,
  initialData
}: CreateCategoryTypeModalProps) => {
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
        htmlFor="category-type-name"
        required
      >
        <Input
          id="category-type-name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Ej: Ahorro, Gasto Fijo, Ingresos..."
          disabled={isSubmitting}
        />
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="category-type-description"
      >
        <Textarea
          id="category-type-description"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Ej: Categorías para gastos mensuales fijos..."
          disabled={isSubmitting}
          rows={3}
        />
      </FormField>

      <FormActions
        submitLabel={isEditing ? "Actualizar tipo" : "Crear tipo"}
        cancelLabel="Cancelar"
        onCancel={onClose}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isFormValid}
      />
    </Form>
  );
};