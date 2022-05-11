<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6 flex justify-between">
			<h1 class="text-2xl">Vzorky</h1>
			<div class="flex justify-end">
				<UiSearch
					:extendable="true"
					class="shadow-sm border mr-3"
				/>
				<UiButton
					:icon="{ type: ['fas', 'plus'] }"
					class="primary rounded-full"
					text="Pridať vzorku"
					@click="$router.push({ name: 'sample-new' })"
				/>
			</div>
		</div>

		<UiTable :options="options">
			<template v-slot="item">
				<td :class="[tableRowsClassObject(options, 0)]">
					{{ item.name }}
				</td>
				<td :class="[tableRowsClassObject(options, 1)]">
					{{ item.user.name }}
				</td>
				<td :class="[tableRowsClassObject(options, 2)]">
					{{ new Date(item.created_at).toLocaleString('sk-SK') }}
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
import { Sample } from '@/store/sample/sample.types';
import { mapActions, mapGetters } from 'vuex';
import UiTableMixin from '@/mixins/UiTable.mixin';

export default defineComponent({
	components: {
		UiButton,
		UiSearch,
		UiTable
	},
	mixins: [UiTableMixin],
	data() {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('SampleStore', ['samples']),
		options(): TableOptions<Sample> {
			return {
				data: {
					items: this.samples,
					onClick: sample =>
						this.$router.push({
							name: 'sample-detail',
							params: { id: sample.id }
						}),
					empty: 'Ľutujeme, nenašli sa žiadne vzorky',
					loading: this.loading
				},
				header: {
					items: [
						{ name: 'názov' },
						{ name: 'používateľ' },
						{ name: 'dátum' }
					]
				},
				layout: [{ width: 96, 'width-sm': 64, left: true }]
			};
		}
	},
	methods: {
		...mapActions('SampleStore', ['fetchSamples', 'resetState'])
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchSamples().finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
