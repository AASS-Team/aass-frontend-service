export interface NavigationGroup {
	title: string;
	items: NavigationItem[];
}

export interface NavigationItem {
	path: string;
	icon: string[];
	title: string;
}

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
	message: string;
	type: AlertType;
	duration: number;
}

export interface State {
	navigation: NavigationGroup[];
	navigationCollapsed: boolean;
	alert: Alert;
	alertActive: boolean;
}

export interface Getters {
	navigation: NavigationGroup[];
	isNavigationCollapsed: boolean;
	alert: Alert;
	isAlertActive: boolean;
}

export type Actions = {
	toggleNavigation: () => Promise<void>;
	setAlert: (alert: Alert) => Promise<void>;
	dismissAlert: () => Promise<void>;
};
