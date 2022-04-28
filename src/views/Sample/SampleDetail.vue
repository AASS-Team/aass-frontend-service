<template>
	<p>SampleList works!</p>
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
import LabMixin from '@/mixins/Lab.mixin';

export default defineComponent({
	components: {
		UiButton,
		UiSearch,
		UiTable,
		UiStatusIcon
	},
	mixins: [UiTableMixin, LabMixin],
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
