import { Dropdown } from '../dropdown/Dropdown';

interface BalanceDropdownProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
  className?: string;
}

export const BalanceDropdown = ({
  onAddIncome,
  onAddExpense,
  className = ''
}: BalanceDropdownProps) => {
  const dropdownItems = [
    {
      id: 'new-income',
      label: 'Nuevo Ingreso',
      onClick: onAddIncome,
      icon: 'fas fa-arrow-up',
      iconColor: 'text-green-500',
      description: 'Registrar nuevo ingreso'
    },
    {
      id: 'new-expense',
      label: 'Nuevo Gasto',
      onClick: onAddExpense,
      icon: 'fas fa-arrow-down',
      iconColor: 'text-red-500',
      description: 'Registrar nuevo gasto'
    }
  ];

  const triggerContent = (
    <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2">
      <i className="fas fa-plus"></i>
      <span>Agregar</span>
      <i className="fas fa-chevron-down text-sm ml-1"></i>
    </div>
  );

  return (
    <Dropdown
      trigger={triggerContent}
      items={dropdownItems}
      className={className}
    />
  );
};