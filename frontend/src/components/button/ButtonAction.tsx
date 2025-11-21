interface ButtonActionProps {
  onClick: () => void;
  title: string;
  icon: string;
  variant?: 'edit' | 'delete' | 'custom';
  className?: string;
  iconClassName?: string;
}

export const ButtonAction = ({
  onClick,
  title,
  icon,
  variant = 'custom',
  className = '',
  iconClassName = ''
}: ButtonActionProps) => {
  const baseClasses = "transition-all duration-300 p-2 rounded-xl flex-shrink-0 border";

  const variantClasses = {
    edit: "text-blue-400 border-blue-200 hover:text-white hover:bg-blue-400",
    delete: "text-pink-400 border-pink-200 hover:text-white hover:bg-pink-400",
    custom: "text-gray-400 border-gray-200 hover:text-white hover:bg-gray-400"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title={title}
    >
      <i className={`${icon} text-sm ${iconClassName}`}></i>
    </button>
  );
};