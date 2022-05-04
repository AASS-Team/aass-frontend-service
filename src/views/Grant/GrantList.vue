<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6 flex justify-between">
			<h1 class="text-2xl">Granty</h1>
			<div class="flex justify-end">
				<UiSearch
					:extendable="true"
					class="shadow-sm border mr-3"
				/>
				<UiButton
					:icon="{ type: ['fas', 'plus'] }"
					class="primary rounded-full"
					text="Pridať grant"
					@click="$router.push({ name: 'grant-new' })"
				/>
			</div>
		</div>

		<UiTable :options="options">
			<template v-slot="item">
				<td :class="[tableRowsClassObject(options, 0)]">
					{{ item.name }}
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
import { Grant } from '@/store/grant/grant.types';
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
		...mapGetters('GrantStore', ['grants']),
		options(): TableOptions<Grant> {
			return {
				data: {
					items: this.grants,
					onClick: grant =>
						this.$router.push({
							name: 'grant-detail',
							params: { id: grant.id }
						}),
					empty: 'Ľutujeme, nenašli sa žiadne granty',
					loading: this.loading
				},
				header: {
					items: [{ name: 'názov grantu' }]
				},
				layout: [{ left: true }]
			};
		}
	},
	methods: {
		...mapActions('GrantStore', ['fetchGrants', 'resetState'])
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchGrants().finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
