<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<UiLabel
					text="Meno"
					labelFor="first_name"
					class="items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						type="text"
						v-else
						v-model="user.first_name"
						name="first_name"
						required
					/>
				</UiLabel>

				<UiLabel
					text="Priezvisko"
					labelFor="last_name"
					class="items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						type="text"
						v-else
						v-model="user.last_name"
						name="last_name"
						required
					/>
				</UiLabel>

				<UiLabel
					text="E-mail"
					labelFor="email"
					class="items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						v-else
						v-model="user.email"
						name="email"
						required
						type="text"
					/>
				</UiLabel>

				<div class="flex flex-row justify-end mt-5">
					<UiButton
						text="Uložiť"
						:disabled="this.loading"
						:icon="
							saving
								? { type: ['fas', 'spinner'], spin: true }
								: null
						"
						type="submit"
						class="rounded-full w-24 primary"
					></UiButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import { mapActions, mapGetters } from 'vuex';
import UiInput from '@/components/ui/UiInput.vue';

export default defineComponent({
	components: {
		UiInput,
		UiButton,
		UiLabel
	},
	data: () => {
		return {
			saving: false,
			loading: true
		};
	},
	computed: {
		...mapGetters('UserStore', ['user'])
	},
	methods: {
		...mapActions('UserStore', ['fetchUser', 'updateUser', 'resetState']),
		...mapActions('UserStore', ['fetchUser']),
		...mapActions('AppStore', ['setAlert']),
		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateUser({
					id: this.user.id,
					user: this.user
				}).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'user-detail',
						params: { id: this.user.id }
					});
				});
			} else {
				this.saving = false;
				(this.$refs.form as HTMLFormElement).reportValidity();
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
