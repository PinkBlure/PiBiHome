import type { CategoryType } from '../../../services/categoryService';
import { ButtonAction } from '../../button/ButtonAction';

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
    <div className="flex items-center justify-between">
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
        <ButtonAction
          onClick={onEdit}
          title="Editar tipo de categoría"
          icon="fas fa-edit"
          variant="edit"
          className="p-3"
        />

        <ButtonAction
          onClick={onDelete}
          title="Eliminar tipo de categoría"
          icon="fas fa-trash"
          variant="delete"
          className="p-3"
        />
      </div>
    </div>
  );
};