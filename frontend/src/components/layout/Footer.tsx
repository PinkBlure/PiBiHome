export const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 py-4 text-center">
      <div className="flex items-center justify-center space-x-2 text-gray-600">
        <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
          <i className="fas fa-heart text-white text-xs"></i>
        </div>
        <span className="font-medium">PiBiHome</span>
        <span className="text-gray-400">•</span>
        <span className="text-sm text-gray-500">v1.0</span>
      </div>
    </footer>
  );
};