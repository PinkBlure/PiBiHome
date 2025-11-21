import { useState } from 'react';
import { Form } from '../form/Form';
import { FormField } from '../form/FormField';
import { Input } from '../form/Input';
import { Textarea } from '../form/Textarea';
import { FormActions } from '../form/FormActions';
import type { CategoryType } from '../../services/categoryService';

interface CreateCategoryModalProps {
  onSubmit: (category: {
    name: string;
    category_type_id: number;
    color: string;
    icon: string;
    description: string;
  }) => Promise<void>;
  onClose: () => void;
  onAddCategoryType: () => void;
  isSubmitting?: boolean;
  categoryTypes: CategoryType[];
  initialData?: {
    name: string;
    category_type_id: number;
    color: string;
    icon: string;
    description: string;
  };
}

export const CreateCategoryModal = ({
  onSubmit,
  onClose,
  onAddCategoryType,
  isSubmitting = false,
  categoryTypes,
  initialData
}: CreateCategoryModalProps) => {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    category_type_id: initialData?.category_type_id || 0,
    color: initialData?.color || 'bg-gray-500',
    icon: initialData?.icon || 'fas fa-folder',
    description: initialData?.description || ''
  }));

  const colorOptions = [
    { value: 'bg-red-400', label: 'Rojo' },
    { value: 'bg-blue-400', label: 'Azul' },
    { value: 'bg-green-400', label: 'Verde' },
    { value: 'bg-yellow-400', label: 'Amarillo' },
    { value: 'bg-purple-400', label: 'Morado' },
    { value: 'bg-pink-400', label: 'Rosa' },
    { value: 'bg-indigo-400', label: 'Índigo' },
  ];

  const iconOptions = [
    { value: 'fas fa-utensils', label: 'Comida' },
    { value: 'fas fa-car', label: 'Transporte' },
    { value: 'fas fa-money-bill-wave', label: 'Dinero' },
    { value: 'fas fa-film', label: 'Entretenimiento' },
    { value: 'fas fa-home', label: 'Hogar' },
    { value: 'fas fa-book', label: 'Educación' },
    { value: 'fas fa-heartbeat', label: 'Salud' },
    { value: 'fas fa-tshirt', label: 'Ropa' },
    { value: 'fas fa-plane', label: 'Viajes' },
    { value: 'fas fa-gift', label: 'Regalos' },
    { value: 'fas fa-lightbulb', label: 'Servicios' },
    { value: 'fas fa-mobile-alt', label: 'Tecnología' },
    { value: 'fas fa-shopping-cart', label: 'Compras' },
    { value: 'fas fa-dumbbell', label: 'Deporte' },
    { value: 'fas fa-paw', label: 'Mascotas' },
    { value: 'fas fa-graduation-cap', label: 'Estudio' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category_type_id) return;
    await onSubmit(formData);
  };

  const isFormValid = formData.name.trim().length > 0 && formData.category_type_id > 0;
  const isEditing = Boolean(initialData);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Nombre"
        htmlFor="category-name"
        required
      >
        <Input
          id="category-name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Ej: Comida, Transporte..."
          disabled={isSubmitting}
        />
      </FormField>

      <FormField
        label="Tipo de Categoría"
        htmlFor="category-type"
        required
      >
        <div className="space-y-2">
          <select
            id="category-type"
            value={formData.category_type_id}
            onChange={(e) => setFormData(prev => ({ ...prev, category_type_id: Number.parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
            disabled={isSubmitting}
          >
            <option value={0}>Selecciona un tipo</option>
            {categoryTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onAddCategoryType}
            className="text-xs text-pink-500 hover:text-pink-600 flex items-center gap-1"
            disabled={isSubmitting}
          >
            <i className="fas fa-plus"></i>
            <span>Crear nuevo tipo</span>
          </button>
        </div>
      </FormField>

      <FormField
        label="Color"
        htmlFor="category-color"
      >
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
              className={`w-8 h-8 rounded-full ${color.value} ${
                formData.color === color.value ? 'ring-2 ring-offset-2 ring-pink-500' : ''
              } transition-all duration-200 hover:scale-110`}
              title={color.label}
              disabled={isSubmitting}
            />
          ))}
        </div>
      </FormField>

      <FormField
        label="Icono"
        htmlFor="category-icon"
      >
        <div className="flex gap-2 flex-wrap">
          {iconOptions.map((icon) => (
            <button
              key={icon.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
              className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 ${
                formData.icon === icon.value
                  ? 'border-pink-500 bg-pink-50 text-pink-600'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
              disabled={isSubmitting}
              title={icon.label}
            >
              <i className={icon.value}></i>
            </button>
          ))}
        </div>
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="category-description"
      >
        <Textarea
          id="category-description"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Descripción de la categoría..."
          disabled={isSubmitting}
          rows={3}
        />
      </FormField>

      <FormActions
        submitLabel={isEditing ? "Actualizar categoría" : "Crear categoría"}
        cancelLabel="Cancelar"
        onCancel={onClose}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!isFormValid}
      />
    </Form>
  );
};