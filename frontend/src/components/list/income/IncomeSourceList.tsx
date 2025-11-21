import type { IncomeSource } from '../../../services/incomeSourceService';
import { IncomeSourceSection } from './IncomeSourceSection';

interface IncomeSourceListProps {
  incomeSources: IncomeSource[];
  onDeleteIncomeSource: (id: number) => void;
  onEditIncomeSource: (id: number) => void;
}

export const IncomeSourceList = ({
  incomeSources,
  onDeleteIncomeSource,
  onEditIncomeSource
}: IncomeSourceListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {incomeSources.map((incomeSource) => (
        <IncomeSourceSection
          key={incomeSource.id}
          incomeSource={incomeSource}
          onDelete={onDeleteIncomeSource}
          onEdit={onEditIncomeSource}
        />
      ))}
    </div>
  );
};