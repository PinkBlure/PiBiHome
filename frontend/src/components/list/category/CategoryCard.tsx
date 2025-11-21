import type { Category } from '../../../services/categoryService';
import { ButtonAction } from '../../button/ButtonAction';

interface CategoryCardProps {
  category: Category;
  onDelete: () => void;
  onEdit: () => void;
}

export const CategoryCard = ({ category, onDelete, onEdit }: CategoryCardProps) => {
  const getIconContent = () => {
    if (!category.icon) {
      return <i className="fas fa-folder"></i>;
    }

    if (typeof category.icon === 'string' && category.icon.includes('fa-')) {
      return <i className={category.icon}></i>;
    }

    return <span>{category.icon}</span>;
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110 ${category.color || 'bg-gray-500'}`}>
            {getIconContent()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-lg truncate">{category.name || 'Sin nombre'}</h3>
            {category.description && (
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{category.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2">
          <ButtonAction
            onClick={onEdit}
            title="Editar categoría"
            icon="fas fa-edit"
            variant="edit"
          />

          <ButtonAction
            onClick={onDelete}
            title="Eliminar categoría"
            icon="fas fa-trash"
            variant="delete"
          />
        </div>
      </div>
    </div>
  );
};