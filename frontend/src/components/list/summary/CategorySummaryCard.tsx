import type { CategorySummary } from '../../../types/categorySummary';

interface CategorySummaryCardProps {
  categorySummary: CategorySummary;
  totalMonthly: number;
  formatCurrency: (amount: number) => string;
}

export const CategorySummaryCard = ({
  categorySummary,
  totalMonthly,
  formatCurrency
}: CategorySummaryCardProps) => {
  const percentage = totalMonthly > 0 ? (categorySummary.total_amount / totalMonthly) * 100 : 0;

  const getIconContent = () => {
    if (!categorySummary.category_icon) {
      return <i className="fas fa-folder"></i>;
    }

    if (typeof categorySummary.category_icon === 'string' && categorySummary.category_icon.includes('fa-')) {
      return <i className={categorySummary.category_icon}></i>;
    }

    return <span>{categorySummary.category_icon}</span>;
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110 ${categorySummary.category_color || 'bg-gray-500'}`}>
            {getIconContent()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-lg break-words whitespace-normal">
              {categorySummary.category_name || 'Sin nombre'}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(categorySummary.total_amount)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {percentage.toFixed(1)}% del total
          </span>
          <span className="text-xs text-gray-500">
            {categorySummary.month}/{categorySummary.year}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${categorySummary.category_color || 'bg-gray-500'}`}
            style={{
              width: `${percentage}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};