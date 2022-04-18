export interface NavigationGroup {
	title: string;
	items: NavigationItem[];
}

export interface NavigationItem {
	path: string;
	icon: string[];
	title: string;
}

export interface State {
	navigation: NavigationGroup[];
	navigationCollapsed: boolean;
}

export interface Getters {
	navigation: NavigationGroup[];
	isNavigationCollapsed: boolean;
}

export type Actions = {
	toggleNavigation: () => Promise<void>;
};
