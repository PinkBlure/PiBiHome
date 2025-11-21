import { Link } from 'react-router-dom';
import { sidebarItems } from '../../config/sidebarItems';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ isOpen, onClose, setSidebarOpen }: SidebarProps) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 bg-black/60 z-40 sm:hidden cursor-default"
          onClick={onClose}
        />
      )}

      <nav
        aria-label="Menú principal"
        className={`
          fixed inset-y-0 right-0
          sm:relative sm:inset-y-auto sm:left-0
          w-80 sm:w-1/4 lg:w-1/5
          bg-gradient-to-b from-white to-pink-50
          transform transition-all duration-300 ease-out
          z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}
          flex flex-col
          border-r border-pink-100
          backdrop-blur-lg bg-white/95
        `}
      >

        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <i className="fas fa-home text-white" aria-hidden="true"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold">Mi PiBiHome</h2>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar menú"
              className="sm:hidden text-white hover:text-pink-200 p-2 transition-colors"
              onClick={onClose}
            >
              <i className="fas fa-times text-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href || '#'}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-all duration-200 group border border-transparent hover:border-pink-200"
                onClick={handleLinkClick}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <i className={`fas fa-${item.icon} text-white text-sm`} aria-hidden="true"></i>
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-pink-100 bg-white/80">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-xs" aria-hidden="true"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Usuario</p>
              <p className="text-xs text-gray-500">En línea</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};