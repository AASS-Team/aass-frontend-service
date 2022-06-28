<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<h1 class="text-2xl mb-4">Zmena hesla</h1>

			<div class="flex items-center pb-3 relative mt-6">
				<UiLabel
					text="Aktuálne heslo"
					labelFor="old_password"
					class="w-1/2"
				>
					<UiInput
						name="old_password"
						type="password"
						required
						class="relative border-2 rounded border-white"
						placeholder="••••••••"
					/>
				</UiLabel>
			</div>

			<div class="flex items-center relative pb-3">
				<UiLabel
					text="Nové heslo"
					labelFor="new_password1"
					class="w-1/2"
				>
					<UiInput
						name="new_password1"
						type="password"
						required
						class="relative border-2 rounded border-white"
						placeholder="********"
						:autocomplete="'off'"
					/>
				</UiLabel>
			</div>

			<div class="flex items-center relative pb-3">
				<UiLabel
					text="Potvrdiť heslo"
					labelFor="new_password2"
					class="w-1/2"
				>
					<UiInput
						name="new_password2"
						type="password"
						required
						class="relative border-2 rounded border-white"
						placeholder="********"
						autocomplete="off"
					/>
				</UiLabel>
			</div>

			<UiButton
				text="Uložiť"
				type="submit"
				class="primary rounded-full mt-5 w-20"
			></UiButton>
			<!--				:disabled="this.loading"-->
			<!--				:icon="-->
			<!--							saving-->
			<!--								? { type: ['fas', 'spinner'], spin: true }-->
			<!--								: null-->
			<!--						"-->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import UiInput from '@/components/ui/UiInput.vue';

export default defineComponent({
	components: {
		UiButton,
		UiInput,
		UiLabel
	}
});
</script>

<style scoped>
.login {
	@apply py-2;
}
</style>
