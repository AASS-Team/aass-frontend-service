<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<h1 class="text-2xl mb-10">
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-3/4 h-full"
				>
					&nbsp;
				</span>
				<template v-else>
					{{ grant.name }}
				</template>
			</h1>

			<div class="flex flex-row justify-end mt-5">
				<UiButton
					:disabled="this.loading"
					text="Upraviť grant"
					class="primary rounded-full ml-3"
					@click="
						this.$router.push({
							name: 'grant-edit',
							params: { id: grant?.id }
						})
					"
				></UiButton>
				<UiButton
					:disabled="this.loading"
					text="Vymazať grant"
					class="danger rounded-full ml-3"
					@click="confirmDelete"
				></UiButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import UiButton from '@/components/ui/UiButton.vue';

export default defineComponent({
	components: {
		UiButton
	},
	data: () => {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('GrantStore', ['grant'])
	},
	methods: {
		...mapActions('AppStore', ['setAlert']),
		...mapActions('GrantStore', ['fetchGrant', 'deleteGrant', 'resetState']),

		confirmDelete() {
			if (confirm('Chcete vymazať tento grant?')) {
				this.deleteGrant(this.grant.id).then(() => {
					return this.$router.push({
						name: 'grant-list'
					});
				});
			}
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		this.fetchGrant(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
