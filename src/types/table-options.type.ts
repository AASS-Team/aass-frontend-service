export interface TableOptions<T> {
	data: {
		items: T[];
		loading: boolean;
		empty: string;
		onClick: (item: T) => unknown;
	};
	header: {
		items: TableHeaderItem[];
	};
	layout: TableColumnLayout[];
}

interface TableHeaderItem {
	name: string;
}

interface TableColumnLayout {
	width: number;
	'width-sm'?: number;
	left?: boolean;
}
