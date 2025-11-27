import React from 'react';

interface BalanceCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  formatCurrency: (amount: number) => string;
}

export const BalanceCards: React.FC<BalanceCardsProps> = ({
  totalIncome,
  totalExpense,
  balance,
  formatCurrency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <BalanceCard
        title="Ingresos totales"
        amount={totalIncome}
        color="green"
        icon="fas fa-arrow-down"
        formatCurrency={formatCurrency}
      />

      <BalanceCard
        title="Gastos totales"
        amount={totalExpense}
        color="red"
        icon="fas fa-arrow-up"
        formatCurrency={formatCurrency}
      />

      <BalanceCard
        title="Balance"
        amount={balance}
        color={balance >= 0 ? 'green' : 'red'}
        icon="fas fa-chart-line"
        formatCurrency={formatCurrency}
        isBalance
      />
    </div>
  );
};

interface BalanceCardProps {
  title: string;
  amount: number;
  color: 'green' | 'red';
  icon: string;
  formatCurrency: (amount: number) => string;
  isBalance?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  amount,
  color,
  icon,
  formatCurrency,
  isBalance = false
}) => {
  const colorClasses = {
    green: {
      text: 'text-green-600',
      bg: 'bg-green-100',
      border: 'border-l-green-500'
    },
    red: {
      text: 'text-red-600',
      bg: 'bg-red-100',
      border: 'border-l-red-500'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
      isBalance ? `border-l-4 ${currentColor.border}` : ''
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${currentColor.text}`}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={`p-3 rounded-full ${currentColor.bg}`}>
          <i className={`${icon} ${currentColor.text} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};