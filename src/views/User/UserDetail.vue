<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<UiLabel
				text="Meno"
				labelFor="first_name"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<p v-else>
					{{ user.first_name }}
				</p>
			</UiLabel>

			<UiLabel
				text="Priezvisko"
				labelFor="last_name"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<p v-else>
					{{ user.last_name }}
				</p>
			</UiLabel>

			<UiLabel
				text="E-mail"
				labelFor="email"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<p v-else>
					{{ user.email }}
				</p>
			</UiLabel>

			<div class="flex flex-row justify-end mt-5">
				<UiButton
					:disabled="this.loading"
					text="Upraviť používateľa"
					class="primary rounded-full ml-3"
					@click="
						this.$router.push({
							name: 'user-edit',
							params: { id: user?.id }
						})
					"
				></UiButton>
				<UiButton
					:disabled="this.loading"
					text="Vymazať používateľa"
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
import UiLabel from '@/components/ui/UiLabel.vue';

export default defineComponent({
	components: {
		UiButton,
		UiLabel
	},
	data: () => {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('UserStore', ['user'])
	},
	methods: {
		...mapActions('AppStore', ['setAlert']),
		...mapActions('UserStore', ['fetchUser', 'deleteUser', 'resetState']),

		confirmDelete() {
			if (confirm('Chcete vymazať používateľa?')) {
				this.deleteUser(this.user.id).then(() => {
					return this.$router.push({
						name: 'user-list'
					});
				});
			}
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		this.fetchUser(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
