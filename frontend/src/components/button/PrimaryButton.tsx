interface PrimaryButtonProps {
  onClick: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
  tooltip?: string;
}

export const PrimaryButton = ({
  onClick,
  text,
  icon,
  disabled = false,
  tooltip
}: PrimaryButtonProps) => {


  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white w-full sm:w-auto"
        title={tooltip}
      >
        {icon && <i className={`fas fa-${icon} mr-2`}></i>}
        {text}
      </button>

      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};