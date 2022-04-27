<template>
	<table class="w-full shadow-sm text-center">
		<thead class="block overflow-y-auto w-full">
			<tr class="table w-full table-fixed">
				<th
					v-for="(item, index) in options.header.items"
					:key="index"
					class="py-1 pb-4 uppercase text-xs text-gray-500 hover:cursor-pointer relative"
					:class="[
						tableRowsClassObject(options, index, (header = true))
					]"
				>
					{{ item.name }}
				</th>
			</tr>
		</thead>

		<tbody
			class="block overflow-y-auto w-full border-t border-gray-200"
			style="max-height: calc(100vh - (32px * 2) - 72px - 65px - 38px)"
		>
			<!-- Empty message -->
			<tr v-if="!options.data.items?.length && !options.data.loading">
				<td
					class="py-3 border-b border-gray-200"
					:colspan="options.header.items.length"
				>
					<p class="text-gray-600 px-6 text-left">
						{{ options.data.empty }}
					</p>
				</td>
			</tr>

			<!-- Loading placeholder -->
			<tr
				v-for="i in loadingItems"
				:key="i"
				class="placeholder"
			>
				<td
					v-for="(item, index) in options.header.items"
					:key="index"
					:class="[tableRowsClassObject(options, index)]"
				>
					<div class="inline-block bg-gray-200 w-3/4 h-full">
						&nbsp;
					</div>
				</td>
			</tr>

			<!-- Table data -->
			<tr
				v-for="item in options.data.items"
				:key="item.id"
				@click="
					options.data.onClick
						? options.data.onClick(item)
						: undefined
				"
				class="cursor-pointer hover:bg-gray-100 table w-full relative table-fixed"
			>
				<slot v-bind="item" />
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import UiTableMixin from '@/mixins/UiTable.mixin';
import { TableOptions } from '@/types/table-options.type';

export default defineComponent({
	mixins: [UiTableMixin],
	props: {
		options: {
			type: Object as PropType<TableOptions<unknown>>,
			required: true
		}
	},
	computed: {
		loadingItems() {
			return this.options.data.loading ? [0, 1, 2] : [];
		}
	}
});
</script>

<style
	scoped
	lang="scss"
>
table {
	@apply text-center;

	thead,
	tbody {
		@apply block overflow-y-auto w-full;

		tr {
			@apply table w-full table-fixed;
		}
	}

	tbody {
		@apply border-t border-gray-200;

		tr {
			&.placeholder:last-child {
				@apply opacity-50;
			}

			td {
				@apply py-3 border-b border-gray-200;
			}
		}
	}
}
</style>
