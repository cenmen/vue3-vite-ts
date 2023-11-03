import { defineStore } from 'pinia';

export interface TabbarItem {
  active?: boolean;
  path: string;
  title: string;
  visible?: boolean;
}

interface State {
  siderCollapsed: boolean;
  tabbarItems: TabbarItem[];
}

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): State => ({
    siderCollapsed: false,
    tabbarItems: []
  }),
  persist: {
    paths: ['siderCollapsed', 'tabbarItems']
  }
});
