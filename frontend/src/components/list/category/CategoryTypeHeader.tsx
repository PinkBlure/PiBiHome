import type { CategoryType } from '../../../services/categoryService';

interface CategoryTypeHeaderProps {
  type: CategoryType;
  categoriesCount: number;
  onDelete: () => void;
  onEdit: () => void;
}

export const CategoryTypeHeader = ({
  type,
  categoriesCount,
  onDelete,
  onEdit
}: CategoryTypeHeaderProps) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-4 h-4 bg-pink-500 rounded-full flex-shrink-0"></div>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {type.name}
          </h2>
          <span className="text-sm text-pink-500 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full flex-shrink-0">
            {categoriesCount} categoría{categoriesCount === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <button
          onClick={onEdit}
          className="text-pink-500 hover:text-white hover:bg-pink-500 transition-all duration-200 p-3 rounded-xl border border-pink-200 hover:border-pink-500"
          title="Editar tipo de categoría"
        >
          <i className="fas fa-edit"></i>
        </button>

        <button
          onClick={onDelete}
          className="text-pink-500 hover:text-white hover:bg-pink-500 transition-all duration-200 p-3 rounded-xl border border-pink-200 hover:border-pink-500"
          title="Eliminar tipo de categoría"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};