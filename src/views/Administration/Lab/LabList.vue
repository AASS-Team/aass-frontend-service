<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6 flex justify-between">
			<h1 class="text-2xl">Laboratóriá</h1>
			<div class="flex justify-end">
				<UiSearch
					:extendable="true"
					class="shadow-sm border mr-3"
				/>
				<UiButton
					:icon="{ type: ['fas', 'plus'] }"
					class="primary rounded-full"
					text="Pridať laboratórium"
					@click="$router.push({ name: 'lab-new' })"
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
					{{ item.address }}
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
import { Lab } from '@/store/lab/lab.types';
import { mapActions, mapGetters } from 'vuex';
import UiTableMixin from '@/mixins/UiTable.mixin';
import UiStatusIcon from '@/components/ui/UiStatusIcon.vue';
import MapAvailable from '@/mixins/Lab.mixin';
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
		...mapGetters('LabStore', ['labs']),
		options(): TableOptions<Lab> {
			return {
				data: {
					items: this.labs,
					onClick: lab =>
						this.$router.push({
							name: 'lab-detail',
							params: { id: lab.id }
						}),
					empty: 'Ľutujeme, nenašli sa žiadne laboratória',
					loading: this.loading
				},
				header: {
					items: [
						{
							name: ''
						},
						{ name: 'názov' },
						{ name: 'adresa' },
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
		...mapActions('LabStore', ['fetchLabs', 'resetState'])
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchLabs().finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>