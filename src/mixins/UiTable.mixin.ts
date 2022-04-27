import { TableOptions } from '@/types/table-options.type';

export default {
	methods: {
		tableRowsClassObject<T = unknown>(
			options: TableOptions<T>,
			index: number,
			header = false
		) {
			return [
				{ 'py-3 border-b border-gray-200': !header },
				options.layout[index] && options.layout[index].width
					? `w-${options.layout[index].width}`
					: '',
				options.layout[index] && options.layout[index]['width-sm']
					? `sm:w-${options.layout[index]['width-sm']}`
					: '',
				{
					'first:pl-6 text-left justify-start':
						options.layout[index] && options.layout[index].left
				}
			];
		}
	}
};
