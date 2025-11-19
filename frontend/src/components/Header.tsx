import { CurrentDateTime } from './dates/CurrentDateTime';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-pink-300">PiBiHome</h1>
          <CurrentDateTime
            showSeconds={true}
            dateFormat="full"
          />
        </div>
      </div>
    </header>
  );
};