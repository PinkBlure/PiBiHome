import { Dropdown } from '../dropdown/Dropdown';

interface CategoryDropdownProps {
  onAddCategory: () => void;
  onAddCategoryType: () => void;
  onManageTags?: () => void;
  className?: string;
}

export const CategoryDropdown = ({
  onAddCategory,
  onAddCategoryType,
  onManageTags,
  className = ''
}: CategoryDropdownProps) => {
  const dropdownItems = [
    {
      id: 'new-category-type',
      label: 'Nuevo tipo',
      onClick: onAddCategoryType,
      icon: 'fas fa-folder-plus',
      iconColor: 'text-purple-500',
      description: 'Crear nuevo tipo de gasto'
    },
    {
      id: 'new-category',
      label: 'Nueva categoría',
      onClick: onAddCategory,
      icon: 'fas fa-tag',
      iconColor: 'text-blue-500',
      description: 'Crear nueva categoría de gasto'
    },
    ...(onManageTags ? [{
      id: 'manage-tags',
      label: 'Gestionar etiquetas',
      onClick: onManageTags,
      icon: 'fas fa-tags',
      iconColor: 'text-green-500',
      description: 'Administrar etiquetas existentes'
    }] : [])
  ];

  const triggerContent = (
    <div className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
      <i className="fas fa-plus"></i>
      <span>Agregar</span>
      <i className="fas fa-chevron-down text-sm ml-1"></i>
    </div>
  );

  return (
    <Dropdown
      trigger={triggerContent}
      items={dropdownItems}
      className={className}
    />
  );
};