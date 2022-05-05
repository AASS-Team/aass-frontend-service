<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6 flex justify-between">
			<h1 class="text-2xl">Používatelia</h1>
			<div class="flex justify-end">
				<UiSearch
					:extendable="true"
					class="shadow-sm border mr-3"
				/>
				<UiButton
					:icon="{ type: ['fas', 'plus'] }"
					class="primary rounded-full"
					text="Pridať používateľa"
					@click="$router.push({ name: 'user-new' })"
				/>
			</div>
		</div>

		<UiTable :options="options">
			<template v-slot="item">
				<td :class="[tableRowsClassObject(options, 0)]">
					{{ item.name }}
				</td>
				<td :class="[tableRowsClassObject(options, 1)]">
					{{ item.email }}
				</td>
				<td :class="[tableRowsClassObject(options, 1)]">
					{{ item.groups[0]?.name }}
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
import { User } from '@/store/user/user.types';
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
		...mapGetters('UserStore', ['users']),
		options(): TableOptions<User> {
			return {
				data: {
					items: this.users,
					onClick: user =>
						this.$router.push({
							name: 'user-detail',
							params: { id: user.id }
						}),
					empty: 'Nenašli sa žiadni používatelia',
					loading: this.loading
				},
				header: {
					items: [
						{ name: 'meno' },
						{ name: 'e-mail' },
						{ name: 'rola' }
					]
				},
				layout: [{ width: 96, 'width-sm': 64, left: true }]
			};
		}
	},
	methods: {
		...mapActions('UserStore', ['fetchUsers', 'resetState'])
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchUsers().finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
