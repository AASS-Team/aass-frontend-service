<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<UiInput
					v-model="tool.name"
					name="name"
					type="text"
					class="header"
					placeholder="Nepomenovaný nástroj"
					required
				/>

				<UiLabel
					text="Typ"
					labelFor="type"
					class="mt-10"
				>
					<UiInput
						v-model="tool.type"
						name="type"
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
			tool: {
				name: undefined,
				type: undefined
			}
		};
	},
	methods: {
		...mapActions('ToolStore', ['saveTool', 'resetState']),
		...mapActions('AppStore', ['setAlert']),

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.saveTool(this.tool).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'tool-list'
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
