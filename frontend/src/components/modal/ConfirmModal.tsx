interface ConfirmModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  variant?: 'delete' | 'warning' | 'info';
}

export const ConfirmModal = ({
  message,
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isSubmitting = false,
  variant = 'delete'
}: ConfirmModalProps) => {
  const variantClasses = {
    delete: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
  };

  const variantIcons = {
    delete: 'fas fa-exclamation-triangle text-red-600',
    warning: 'fas fa-exclamation-circle text-yellow-600',
    info: 'fas fa-info-circle text-blue-600'
  };

  const variantBackgrounds = {
    delete: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100'
  };

  const variantTitles = {
    delete: 'Confirmar eliminación',
    warning: 'Advertencia',
    info: 'Confirmación'
  };

  const backgroundClass = variantBackgrounds[variant];
  const title = variantTitles[variant];
  const iconClass = variantIcons[variant];
  const buttonClass = variantClasses[variant];

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${backgroundClass}`}>
          <i className={`${iconClass} text-xl`}></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">
            {title}
          </h3>
          <p className="text-gray-700 mt-1">{message}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 transition-colors duration-200"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200 ${buttonClass}`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Procesando...
            </div>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </div>
  );
};