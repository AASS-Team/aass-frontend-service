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
				>
					<UiInput
						type="text"
						:value="user.first_name"
						required
						name="first_name"
					>
					</UiInput>
				</UiLabel>

				<UiLabel
					text="Priezvisko"
					labelFor="last_name"
				>
					<UiInput
						type="text"
						:value="user.last_name"
						required
						name="last_name"
					>
					</UiInput>
				</UiLabel>

				<UiLabel
					text="E-mail"
					labelFor="email"
				>
					<UiInput
						type="text"
						:value="user.email"
						required
						name="email"
					>
					</UiInput>
				</UiLabel>

				<div class="flex flex-row justify-end mt-5">
					<UiButton
						text="Uložiť"
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
import { mapActions } from 'vuex';
import UiInput from '@/components/ui/UiInput.vue';

export default defineComponent({
	components: {
		UiInput,
		UiButton,
		UiLabel
	},
	data() {
		return {
			saving: false,
			user: {
				name: undefined,
				address: undefined
			},
		};
	},
	methods: {
		...mapActions('UserStore', ['saveUser', 'resetState']),
		...mapActions('AppStore', ['setAlert']),

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.saveUser(this.user).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'user-list'
					});
				});
			} else {
				this.saving = false;
				(this.$refs.form as HTMLFormElement).reportValidity();
			}
		}
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
