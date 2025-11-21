export interface SidebarItem {
  icon: string;
  label: string;
  href?: string;
}

export const sidebarItems: SidebarItem[] = [
  { icon: 'home', label: 'Inicio', href: '/' },
  // { icon: 'chart-pie', label: 'Dashboard', href: '/dashboard' },
  // { icon: 'wallet', label: 'Finanzas', href: '/finances' },
  { icon: 'tags', label: 'Categorías', href: '/categories' },
  // { icon: 'cog', label: 'Configuración', href: '/settings' }
];