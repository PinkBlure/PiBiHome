export const Home = () => {
  return (
    <div className="min-h-full">
      <div className="bg-gradient-to-br from-pink-400/10 via-purple-400/10 to-blue-400/10 rounded-3xl p-8 mb-8 border border-white/50">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-5xl text-white">🏠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Bienvenido a <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">PiBiHome</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu centro de control para gestionar finanzas personales de manera inteligente y elegante
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Comenzar Ahora
            </button>
            <button className="border-2 border-pink-300 text-pink-500 hover:bg-pink-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Ver Tutorial
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl text-white">💰</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Control Financiero</h3>
          <p className="text-gray-600 text-sm">
            Gestiona tus ingresos y gastos con herramientas intuitivas y reportes detallados
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl text-white">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Dashboard Inteligente</h3>
          <p className="text-gray-600 text-sm">
            Visualiza tu progreso financiero con gráficos interactivos y métricas en tiempo real
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl text-white">🎯</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Metas Personalizadas</h3>
          <p className="text-gray-600 text-sm">
            Establece y alcanza tus objetivos de ahorro con planes personalizados
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold">$0</div>
            <div className="text-pink-100 text-sm">Balance Actual</div>
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-pink-100 text-sm">Transacciones</div>
          </div>
          <div>
            <div className="text-2xl font-bold">0%</div>
            <div className="text-pink-100 text-sm">Metas Cumplidas</div>
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-pink-100 text-sm">Categorías</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-200 shadow-sm">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-600 text-sm">Sistema listo para comenzar</span>
        </div>
      </div>
    </div>
  );
};