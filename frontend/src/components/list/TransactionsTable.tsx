import { formatCurrency } from '../../utils/formatters';
import { ButtonAction } from '../button/ButtonAction';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  source: string;
  date: string;
  color: string;
  icon: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  runningBalance: number[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CO');
};

export const TransactionsTable = ({
  transactions,
  runningBalance,
  onEdit,
  onDelete
}: TransactionsTableProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">
          <i className="fas fa-exchange-alt text-gray-300"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No hay transacciones
        </h3>
        <p className="text-gray-500">
          Comienza agregando tus primeros ingresos y gastos
        </p>
      </div>
    );
  }

  const handleEdit = (transaction: Transaction) => {
    onEdit?.(transaction);
  };

  const handleDelete = (transaction: Transaction) => {
    onDelete?.(transaction);
  };

  return (
    <div className="overflow-hidden">
      <div className="hidden md:block">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">Descripción</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Tipo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Fecha</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Cantidad</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Balance</th>
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={`${transaction.type}-${transaction.id}`} className="hover:bg-gray-50 group">
                <td className="px-4 py-4">
                  <div className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 ${
                        transaction.type === 'income'
                          ? 'bg-green-200 text-green-600'
                          : `${transaction.color || 'bg-gray-500'} text-white`
                      }`}
                    >
                      <i className={transaction.icon}></i>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 break-words">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500 capitalize mt-1">
                        {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900 break-words">{transaction.source}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span
                    className={`${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    } font-semibold`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span
                    className={`${
                      runningBalance[index] >= 0 ? 'text-green-600' : 'text-red-600'
                    } font-semibold`}
                  >
                    {formatCurrency(runningBalance[index])}
                  </span>
                </td>
                {(onEdit || onDelete) && (
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      <ButtonAction
                        onClick={() => handleEdit(transaction)}
                        title="Editar transacción"
                        icon="fas fa-edit"
                        variant="edit"
                      />
                      <ButtonAction
                        onClick={() => handleDelete(transaction)}
                        title="Eliminar transacción"
                        icon="fas fa-trash"
                        variant="delete"
                      />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 p-4">
        {transactions.map((transaction, index) => (
          <div
            key={`${transaction.type}-${transaction.id}-mobile`}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110 ${
                    transaction.type === 'income'
                      ? 'bg-green-500'
                      : transaction.color || 'bg-gray-500'
                  }`}
                >
                  <i className={transaction.icon}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 break-words">
                    {transaction.description}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {transaction.source}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-semibold block ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <span
                  className={`text-sm font-semibold block mt-1 ${
                    runningBalance[index] >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {formatCurrency(runningBalance[index])}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-3">
              <div className="flex items-center space-x-2">
                <span className="capitalize">
                  {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                </span>
                <span>{formatDate(transaction.date)}</span>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <ButtonAction
                  onClick={() => handleEdit(transaction)}
                  title="Editar transacción"
                  icon="fas fa-edit"
                  variant="edit"
                />

                <ButtonAction
                  onClick={() => handleDelete(transaction)}
                  title="Eliminar transacción"
                  icon="fas fa-trash"
                  variant="delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};