import { IMainNavUIItemState } from '../../../../interfaces/common.interface';

export const mainNavigationModel: IMainNavUIItemState[] = [
  {
    id: 'home',
    name: 'Home',
    href: '/home',
    selected: false,
    access: {read: 'all'},
    userMenu: false,
    icon: ''
  },
  {
    id: 'research',
    name: 'Research',
    href: '/research',
    selected: false,
    access: {read: 'all'},
    userMenu: false,
    icon: ''
  }
];
