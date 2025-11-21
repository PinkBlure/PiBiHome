import { useState, useEffect } from 'react';
import type { Category, CategoryType } from '../services/categoryService';
import { categoryService } from '../services/categoryService';
import { CategoryDropdown } from '../components/dropdown/CategoryDropdown';
import { Modal } from '../components/modal/Modal';
import { CreateCategoryTypeModal } from '../components/modal/CreateCategoryTypeModal';
import { CreateCategoryModal } from '../components/modal/CreateCategoryModal';
import { CategoryTypeList } from '../components/list/category/CategoryTypeList';

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isAddingType, setIsAddingType] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);
  const [editingType, setEditingType] = useState<CategoryType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingType, setIsSubmittingType] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const types = await categoryService.getCategoryTypes();
      setCategoryTypes(types);

      const categoriesData = await categoryService.getAll();
      setCategories(categoriesData);

    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (categoryData: {
    name: string;
    category_type_id: number;
    color: string;
    icon: string;
    description: string;
  }) => {
    if (!categoryData.name.trim() || !categoryData.category_type_id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const createdCategory = await categoryService.create({
        name: categoryData.name.trim(),
        category_type_id: categoryData.category_type_id,
        color: categoryData.color,
        icon: categoryData.icon,
        description: categoryData.description.trim() || undefined
      });

      setCategories(prev => [...prev, createdCategory]);
      setIsAdding(false);
    } catch (err) {
      setError('Error al crear la categoría');
      console.error('Error creating category:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategoryType = async (categoryTypeData: { name: string; description: string }) => {
    if (!categoryTypeData.name.trim()) return;

    try {
      setIsSubmittingType(true);
      setError(null);

      const createdCategoryType = await categoryService.createCategoryType(categoryTypeData);
      setCategoryTypes(prev => [...prev, createdCategoryType]);

      setIsAddingType(false);
    } catch (err) {
      setError('Error al crear el tipo de categoría');
      console.error('Error creating category type:', err);
    } finally {
      setIsSubmittingType(false);
    }
  };

  const handleEditCategoryType = async (categoryTypeData: { name: string; description: string }) => {
    if (!categoryTypeData.name.trim() || !editingType) return;

    try {
      setIsSubmittingType(true);
      setError(null);

      const updatedCategoryType = await categoryService.updateCategoryType(editingType.id, categoryTypeData);
      setCategoryTypes(prev => prev.map(type =>
        type.id === editingType.id ? updatedCategoryType : type
      ));

      setEditingType(null);
      setIsEditingType(false);
    } catch (err) {
      setError('Error al actualizar el tipo de categoría');
      console.error('Error updating category type:', err);
    } finally {
      setIsSubmittingType(false);
    }
  };

  const handleStartEditCategoryType = (id: number) => {
    const typeToEdit = categoryTypes.find(type => type.id === id);
    if (typeToEdit) {
      setEditingType(typeToEdit);
      setIsEditingType(true);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      setError(null);
      await categoryService.delete(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      setError('Error al eliminar la categoría');
      console.error('Error deleting category:', err);
    }
  };

  const handleDeleteCategoryType = async (id: number) => {
    try {
      setError(null);
      await categoryService.deleteCategoryType(id);
      setCategoryTypes(prev => prev.filter(type => type.id !== id));
      setCategories(prev => prev.filter(cat => cat.category_type_id !== id));
    } catch (err) {
      setError('Error al eliminar el tipo de categoría');
      console.error('Error deleting category type:', err);
    }
  };

  const handleManageTags = () => {
    console.log('Gestionar etiquetas');
  };

  const handleAddCategoryTypeFromCategory = () => {
    setIsAdding(false);
    setIsAddingType(true);
  };

  const categoriesByType = categoryTypes.map(type => ({
    type,
    categories: categories.filter(cat => cat.category_type_id === type.id)
  }));

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Categorías</h1>
          <p className="text-gray-600">Gestiona tus categorías organizadas por tipos</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
          <CategoryDropdown
            onAddCategory={() => setIsAdding(true)}
            onAddCategoryType={() => setIsAddingType(true)}
            onManageTags={handleManageTags}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <Modal
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        title="Crear nueva categoría"
        size="md"
      >
        <CreateCategoryModal
          onSubmit={handleAddCategory}
          onClose={() => setIsAdding(false)}
          onAddCategoryType={handleAddCategoryTypeFromCategory}
          isSubmitting={isSubmitting}
          categoryTypes={categoryTypes}
        />
      </Modal>

      <Modal
        isOpen={isAddingType}
        onClose={() => setIsAddingType(false)}
        title="Crear un nuevo tipo de categoría"
        size="md"
      >
        <CreateCategoryTypeModal
          onSubmit={handleAddCategoryType}
          onClose={() => setIsAddingType(false)}
          isSubmitting={isSubmittingType}
        />
      </Modal>

      <Modal
        isOpen={isEditingType}
        onClose={() => {
          setIsEditingType(false);
          setEditingType(null);
        }}
        title="Editar tipo de categoría"
        size="md"
      >
        <CreateCategoryTypeModal
          key={editingType?.id || 'create'}
          onSubmit={handleEditCategoryType}
          onClose={() => {
            setIsEditingType(false);
            setEditingType(null);
          }}
          isSubmitting={isSubmittingType}
          initialData={editingType ? {
            name: editingType.name,
            description: editingType.description || ''
          } : undefined}
        />
      </Modal>

      {categories.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            <i className="fas fa-folder text-pink-400"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay categorías
          </h3>
          <p className="text-gray-500 mb-6">
            Comienza creando tu primera categoría para organizar tus finanzas
          </p>
          <div className="flex gap-3 justify-center">
            <CategoryDropdown
              onAddCategory={() => setIsAdding(true)}
              onAddCategoryType={() => setIsAddingType(true)}
              onManageTags={handleManageTags}
            />
          </div>
        </div>
      )}

      <CategoryTypeList
        categoriesByType={categoriesByType}
        onDeleteCategoryType={handleDeleteCategoryType}
        onEditCategoryType={handleStartEditCategoryType}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};