<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6 flex justify-between">
			<h1 class="text-2xl">Nástroje</h1>
			<div class="flex justify-end">
				<UiSearch
					:extendable="true"
					class="shadow-sm border mr-3"
				/>
				<UiButton
					:icon="{ type: ['fas', 'plus'] }"
					class="primary rounded-full"
					text="Pridať nástroj"
					@click="$router.push({ name: 'tool-new' })"
				/>
			</div>
		</div>

		<UiTable :options="options">
			<template v-slot="item">
				<td
					class="py-3 border-b border-gray-200"
					:class="[tableRowsClassObject(options, 0)]"
				>
					<UiStatusIcon :available="item.available" />
				</td>
				<td
					class="py-3 border-b border-gray-200"
					:class="[tableRowsClassObject(options, 1)]"
				>
					{{ item.name }}
				</td>
				<td
					class="py-3 border-b border-gray-200"
					:class="[tableRowsClassObject(options, 2)]"
				>
					{{ item.type }}
				</td>
				<td
					class="py-3"
					:class="[tableRowsClassObject(options, 3)]"
				>
					{{ mapAvailable(item.available) }}
				</td>
			</template>
		</UiTable>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiSearch from '@/components/ui/UiSearch.vue';
import UiTable from '@/components/ui/UiTable.vue';
import { TableOptions } from '@/types/table-options.type';
import { Tool } from '@/store/tool/tool.types';
import { mapActions, mapGetters } from 'vuex';
import UiTableMixin from '@/mixins/UiTable.mixin';
import UiStatusIcon from '@/components/ui/UiStatusIcon.vue';
import MapAvailable from '@/mixins/MapAvailable.mixin';

export default defineComponent({
	components: {
		UiButton,
		UiSearch,
		UiTable,
		UiStatusIcon
	},
	mixins: [UiTableMixin, MapAvailable],

	data() {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('ToolStore', ['tools']),
		options(): TableOptions<Tool> {
			return {
				data: {
					items: this.tools,
					onClick: tool =>
						this.$router.push({
							name: 'tool-detail',
							params: { id: tool.id }
						}),
					empty: 'Ľutujeme, nenašiel sa žiaden nástroj',
					loading: this.loading
				},
				header: {
					items: [
						{
							name: ''
						},
						{ name: 'názov' },
						{ name: 'typ' },
						{ name: 'stav' }
					]
				},
				layout: [
					{ width: 8 },
					{ width: 96, 'width-sm': 64, left: true }
				]
			};
		}
	},
	methods: {
		...mapActions('ToolStore', ['fetchTools', 'resetState'])
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchTools().finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
