import type { IncomeSource } from '../../../services/incomeSourceService';
import { ButtonAction } from '../../button/ButtonAction';

interface IncomeSourceSectionProps {
  incomeSource: IncomeSource;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const IncomeSourceSection = ({
  incomeSource,
  onDelete,
  onEdit
}: IncomeSourceSectionProps) => {
  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-4 h-4 bg-pink-500 rounded-full flex-shrink-0 mt-1"></div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-lg">{incomeSource.name}</h3>
            {incomeSource.description && (
              <p className="text-gray-500 text-sm mt-1">{incomeSource.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2">
          <ButtonAction
            onClick={() => onEdit(incomeSource.id)}
            title="Editar fuente de ingreso"
            icon="fas fa-edit"
            variant="edit"
          />

          <ButtonAction
            onClick={() => onDelete(incomeSource.id)}
            title="Eliminar fuente de ingreso"
            icon="fas fa-trash"
            variant="delete"
          />
        </div>
      </div>
    </div>
  );
};