import React, { useState } from 'react';
import { useCategorySummary } from '../hooks/useCategorySummary';
import { CategorySummaryCard } from '../components/list/summary/CategorySummaryCard';
import { CategoryTypeSummary } from '../components/list/summary/CategoryTypeSummary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';

interface MonthlyCategorySummaryProps {
  initialMonth?: number;
  initialYear?: number;
}

export const MonthlyCategorySummary: React.FC<MonthlyCategorySummaryProps> = ({
  initialMonth,
  initialYear
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth || new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(initialYear || new Date().getFullYear());

  const { summary, categoryTypeSummary, loading, error, totalMonthly } = useCategorySummary(selectedMonth, selectedYear);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando resumen por categoría..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gastos por categoría</h2>
          <p className="text-gray-600">
            Resumen mensual de tus gastos organizados por categoría
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="year-select" className="text-sm font-medium text-gray-700">
              Año:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="month-select" className="text-sm font-medium text-gray-700">
              Mes:
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
            >
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-pink-100 text-sm font-medium">Total gastado en</p>
            <p className="text-2xl font-bold">{months[selectedMonth - 1]} {selectedYear}</p>
            <p className="text-3xl font-bold mt-2">{formatCurrency(totalMonthly)}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-xl">
            <i className="fas fa-chart-pie text-2xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryTypeSummary
            typeSummary={categoryTypeSummary}
            formatCurrency={formatCurrency}
          />
        </div>

        <div className="lg:col-span-2">
          {summary.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {summary.map(categorySummary => (
                <CategorySummaryCard
                  key={categorySummary.category_id}
                  categorySummary={categorySummary}
                  totalMonthly={totalMonthly}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <i className="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay gastos registrados</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                No se encontraron gastos para {months[selectedMonth - 1]} de {selectedYear}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};