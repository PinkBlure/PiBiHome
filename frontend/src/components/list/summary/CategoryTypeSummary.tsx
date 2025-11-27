import React from 'react';

interface CategoryTypeSummaryProps {
  typeSummary: Array<{
    category_type_id: number;
    category_type_name: string;
    total_amount: number;
    percentage: number;
    color: string;
  }>;
  formatCurrency: (amount: number) => string;
}

export const CategoryTypeSummary: React.FC<CategoryTypeSummaryProps> = ({
  typeSummary,
  formatCurrency
}) => {
  if (typeSummary.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Distribución por Tipo de Categoría
      </h3>

      <div className="space-y-4">
        {typeSummary.map((type) => (
          <div key={type.category_type_id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: type.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700 flex-1">
                {type.category_type_name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-16 text-right">
                {type.percentage.toFixed(1)}%
              </span>
              <span className="text-sm font-semibold text-gray-900 w-24 text-right">
                {formatCurrency(type.total_amount)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de barras horizontal */}
      <div className="mt-6 space-y-2">
        {typeSummary.map((type) => (
          <div key={type.category_type_id} className="flex items-center gap-3">
            <div className="w-20 text-sm text-gray-600 text-right">
              {type.percentage.toFixed(1)}%
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: type.color,
                  width: `${type.percentage}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};