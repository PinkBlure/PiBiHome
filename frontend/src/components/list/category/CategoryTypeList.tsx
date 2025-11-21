import type { CategoryType, Category } from '../../../services/categoryService';
import { CategoryTypeSection } from './CategoryTypeSection';

interface CategoryTypeListProps {
  categoriesByType: Array<{
    type: CategoryType;
    categories: Category[];
  }>;
  onDeleteCategoryType: (id: number) => void;
  onEditCategoryType: (id: number) => void;
  onDeleteCategory: (id: number) => void;
  onEditCategory: (id: number) => void;
}

export const CategoryTypeList = ({
  categoriesByType,
  onDeleteCategoryType,
  onEditCategoryType,
  onDeleteCategory,
  onEditCategory
}: CategoryTypeListProps) => {
  return (
    <div className="space-y-8">
      {categoriesByType.map(({ type, categories: typeCategories }) => (
        <CategoryTypeSection
          key={type.id}
          type={type}
          categories={typeCategories}
          onDeleteCategoryType={onDeleteCategoryType}
          onEditCategoryType={onEditCategoryType}
          onDeleteCategory={onDeleteCategory}
          onEditCategory={onEditCategory}
        />
      ))}
    </div>
  );
};