import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: string;
  description?: string;
  iconColor?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'left' | 'right';
  className?: string;
}

export const Dropdown = ({
  trigger,
  items,
  position = 'right',
  className = ''
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    item.onClick();
    setIsOpen(false);
  };

  const handleItemKeyDown = (event: React.KeyboardEvent, item: DropdownItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const positionClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className={`relative dropdown-container ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className="outline-none rounded-lg cursor-pointer bg-transparent border-none p-0"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} top-full mt-2 w-56 bg-white rounded-lg border border-gray-200 z-50`}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => handleItemKeyDown(e, item)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors duration-150 outline-none focus:bg-gray-50"
              role="menuitem"
            >
              {item.icon && (
                <i className={`${item.icon} ${item.iconColor || 'text-gray-500'} w-5`}></i>
              )}
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-gray-500">{item.description}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};