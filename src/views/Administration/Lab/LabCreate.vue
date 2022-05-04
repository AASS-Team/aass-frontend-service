<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<UiInput
					v-model="lab.name"
					name="name"
					type="text"
					class="header"
					placeholder="Nepomenované laboratórium"
					required
				/>

				<UiLabel
					text="Adresa"
					labelFor="address"
					class="mt-10"
				>
					<UiInput
						v-model="lab.address"
						name="address"
						type="text"
						required
					/>
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
		UiButton,
		UiLabel,
		UiInput
	},
	data() {
		return {
			saving: false,
			lab: {
				name: undefined,
				address: undefined
			}
		};
	},
	methods: {
		...mapActions('LabStore', ['saveLab', 'resetState']),
		...mapActions('AppStore', ['setAlert']),

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.saveLab(this.lab).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'lab-list'
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
