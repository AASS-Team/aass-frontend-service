<template>
	<div class="h-full flex bg-gray-200">
		<Alert />

		<div class="fixed flex w-full shadow-lg bg-yellow-500 p-4">
			<a href="/">
				<img
					src="@/assets/img/logo-extended.png"
					alt="STU FCHPT logo"
					class="w-3/4"
				/>
			</a>
		</div>

		<div class="mx-auto flex justify-center items-center">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<div class="w-96 bg-white rounded-lg shadow-xl p-8">
					<h1
						class="text-gray-800 text-3xl font-bold pt-3 text-center"
					>
						Vitajte
					</h1>

					<p class="text-center text-gray-700">
						Pokračujte prosím prihlásením sa
					</p>

					<div class="relative mt-16 border-2 rounded border-white">
						<label
							for="login"
							class="uppercase text-gray-600 text-xs font-bold absolute pl-3 pt-2"
						>
							Login
						</label>

						<UiInput
							v-model="username"
							type="email"
							name="username"
							placeholder="vasa@adresa.sk"
							class="w-full"
							:class="{
								'border-2 border-red-500': errors.length
							}"
							labeled
							required
						/>
					</div>

					<div
						class="relative mt-5 w-100 border-2 rounded border-white"
					>
						<label
							for="password"
							class="uppercase text-gray-600 text-xs font-bold absolute pl-3 pt-2"
						>
							Heslo
						</label>

						<UiInput
							v-model="password"
							type="password"
							name="password"
							placeholder="*********"
							class="w-full"
							:class="{
								'border-2 border-red-500': errors.length
							}"
							labeled
							required
						/>
					</div>

					<div class="pt-8 text-center">
						<UiButton
							type="submit"
							text="Prihlásiť sa"
							:icon="
								submitting
									? { type: ['fas', 'spinner'], spin: true }
									: null
							"
							class="primary rounded-full mx-auto login"
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiInput from '@/components/ui/UiInput.vue';
import Alert from '@/components/Alert/Alert.vue';
import { mapActions } from 'vuex';

export default defineComponent({
	components: {
		UiButton,
		UiInput,
		Alert
	},
	data: () => {
		return {
			submitting: false,
			errors: [],
			username: '',
			password: ''
		};
	},
	watch: {
		username(newValue) {
			// if changed, disable red border
			this.errors = [];
		},
		password(newValue) {
			// if changed, disable red border
			this.errors = [];
		}
	},
	methods: {
		...mapActions('AppStore', ['login']),

		handleSubmit() {
			this.submitting = true;
			this.errors = [];
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.login({
					username: this.username,
					password: this.password
				})
					.then(() => {
						this.submitting = false;
						return this.$router.push({
							name: 'sample-list'
						});
					})
					.catch(e => {
						this.submitting = false;
						this.errors = Array.isArray(e) ? [...e] : e;
					});
			} else {
				this.submitting = false;
				(this.$refs.form as HTMLFormElement).reportValidity();
			}
		}
	}
});
</script>

<style scoped>
.login {
	@apply py-2;
}
</style>
