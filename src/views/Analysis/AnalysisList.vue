<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6 flex justify-between">
			<h1 class="text-2xl">Analýzy</h1>
			<div class="flex justify-end">
				<UiSearch
					:extendable="true"
					class="shadow-sm border mr-3"
				/>
				<UiButton
					:icon="{ type: ['fas', 'plus'] }"
					class="primary rounded-full"
					text="Pridať analýzu"
					@click="$router.push({ name: 'analysis-new' })"
				/>
			</div>
		</div>

		<UiTable :options="options">
			<template v-slot="item">
				<td :class="[tableRowsClassObject(options, 0)]">
					<UiStatusIcon :status="item.status" />
				</td>
				<td :class="[tableRowsClassObject(options, 1)]">
					{{ item.sample.name }}
				</td>
				<td :class="[tableRowsClassObject(options, 2)]">
					{{ mapStatus(item.status) }}
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
import { Analysis } from '@/store/analysis/analysis.types';
import { mapActions, mapGetters } from 'vuex';
import UiTableMixin from '@/mixins/UiTable.mixin';
import UiStatusIcon from '@/components/ui/UiStatusIcon.vue';
import MapStatus from '@/mixins/MapStatus.mixin';

export default defineComponent({
	components: {
		UiButton,
		UiSearch,
		UiTable,
		UiStatusIcon
	},
	mixins: [UiTableMixin, MapStatus],

	data() {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('AnalysisStore', ['analyses']),
		options(): TableOptions<Analysis> {
			return {
				data: {
					items: this.analyses,
					onClick: analysis =>
						this.$router.push({
							name: 'analysis-detail',
							params: { id: analysis.id }
						}),
					empty: 'Ľutujeme, nenašla sa žiadna analýza',
					loading: this.loading
				},
				header: {
					items: [
						{
							name: ''
						},
						{ name: 'vzorka' },
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
		...mapActions('AnalysisStore', ['fetchAnalyses', 'resetState'])
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchAnalyses().finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
