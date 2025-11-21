interface FormActionsProps {
  submitLabel: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  className?: string;
}

export const FormActions = ({
  submitLabel,
  cancelLabel = 'Cancelar',
  onCancel,
  isSubmitting = false,
  isSubmitDisabled = false,
  className = ''
}: FormActionsProps) => {
  return (
    <div className={`flex justify-end gap-3 pt-8 ${className}`}>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelLabel}
        </button>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled || isSubmitting}
        className="px-6 py-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed min-w-24"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2 justify-center">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Guardando...</span>
          </div>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
};