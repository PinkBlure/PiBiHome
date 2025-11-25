import type { Category } from '../../../services/categoryService';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  onDeleteCategory: (id: number) => void;
  onEditCategory: (id: number) => void;
}

export const CategoryGrid = ({
  categories,
  onDeleteCategory,
  onEditCategory
}: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={() => onDeleteCategory(category.id)}
          onEdit={() => onEditCategory(category.id)}
        />
      ))}
    </div>
  );
};