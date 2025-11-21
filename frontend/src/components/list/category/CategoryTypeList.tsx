import type { CategoryType, Category  } from '../../../services/categoryService';
import { CategoryTypeSection } from './CategoryTypeSection';

interface CategoryTypeWithCategories {
  type: CategoryType;
  categories: Category[];
}

interface CategoryTypeListProps {
  categoriesByType: CategoryTypeWithCategories[];
  onDeleteCategoryType: (id: number) => void;
  onEditCategoryType: (id: number) => void;
  onDeleteCategory: (id: number) => void;
}

export const CategoryTypeList = ({
  categoriesByType,
  onDeleteCategoryType,
  onEditCategoryType,
  onDeleteCategory
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
        />
      ))}
    </div>
  );
};