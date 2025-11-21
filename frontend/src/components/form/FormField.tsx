interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  error?: string;
  helperText?: string;
}

export const FormField = ({
  label,
  htmlFor,
  required = false,
  children,
  className = '',
  error,
  helperText
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {children}

      {error && (
        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};