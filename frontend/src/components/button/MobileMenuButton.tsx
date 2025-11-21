interface MobileMenuButtonProps {
  onClick: () => void;
}

export const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      aria-label="Abrir menú"
      className="sm:hidden fixed bottom-6 right-6 z-30 bg-gradient-to-br from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <i className="fas fa-bars text-lg" aria-hidden="true"></i>
    </button>
  );
};