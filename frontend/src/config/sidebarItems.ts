export interface SidebarItem {
  icon: string;
  label: string;
  href?: string;
}

export const sidebarItems: SidebarItem[] = [
  { icon: 'home', label: 'Inicio', href: '/' },
  { icon: 'wallet', label: 'Balance', href: '/balance' },
  { icon: 'tags', label: 'Categorías', href: '/categories' },
  { icon: 'chart-pie', label: 'Resumen', href: '/summary' },
];