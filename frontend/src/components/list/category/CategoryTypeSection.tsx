import type { Category, CategoryType } from '../../../services/categoryService';
import { CategoryTypeHeader } from './CategoryTypeHeader';
import { CategoryGrid } from './CategoryGrid';
import { EmptyCategoryState } from './EmptyCategoryState';

interface CategoryTypeSectionProps {
  type: CategoryType;
  categories: Category[];
  onDeleteCategoryType: (id: number) => void;
  onEditCategoryType: (id: number) => void;
  onDeleteCategory: (id: number) => void;
  onEditCategory: (id: number) => void;
}

export const CategoryTypeSection = ({
  type,
  categories,
  onDeleteCategoryType,
  onEditCategoryType,
  onDeleteCategory,
  onEditCategory
}: CategoryTypeSectionProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <CategoryTypeHeader
        type={type}
        categoriesCount={categories.length}
        onDelete={() => onDeleteCategoryType(type.id)}
        onEdit={() => onEditCategoryType(type.id)}
      />

      {type.description && (
        <p className="text-gray-600 text-sm mb-4">{type.description}</p>
      )}

      {categories.length > 0 ? (
        <CategoryGrid
          categories={categories}
          onDeleteCategory={onDeleteCategory}
          onEditCategory={onEditCategory}
        />
      ) : (
        <EmptyCategoryState />
      )}
    </div>
  );
};