import type { Category } from '../../../services/categoryService';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  onDeleteCategory: (id: number) => void;
}

export const CategoryGrid = ({ categories, onDeleteCategory }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={() => onDeleteCategory(category.id)}
        />
      ))}
    </div>
  );
};