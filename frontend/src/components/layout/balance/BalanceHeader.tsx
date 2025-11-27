import React from 'react';
import { BalanceDropdown } from '../../dropdown/BalanceDropdown';

interface BalanceHeaderProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export const BalanceHeader: React.FC<BalanceHeaderProps> = ({
  onAddIncome,
  onAddExpense
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Balance Financiero
        </h1>
        <p className="text-gray-600">Resumen de tus ingresos y gastos</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
        <BalanceDropdown
          onAddIncome={onAddIncome}
          onAddExpense={onAddExpense}
        />
      </div>
    </div>
  );
};