<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<span
					v-if="this.loading"
					class="text-2xl inline-block bg-gray-200 w-1/3 h-full"
				>
					&nbsp;
				</span>
				<UiInput
					v-else
					v-model="tool.name"
					name="name"
					type="text"
					class="header"
					required
				/>

				<UiLabel
					text="Typ"
					labelFor="type"
					class="mt-10"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						v-else
						v-model="tool.type"
						name="type"
						type="text"
						required
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
		UiButton,
		UiLabel,
		UiInput
	},
	data: () => {
		return {
			saving: false,
			loading: true
		};
	},
	computed: {
		...mapGetters('ToolStore', ['tool'])
	},
	methods: {
		...mapActions('ToolStore', ['fetchTool', 'updateTool', 'resetState']),
		...mapActions('AppStore', ['setAlert']),
		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateTool({
					id: this.tool.id,
					tool: this.tool
				}).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'tool-detail',
						params: { id: this.tool.id }
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
		this.fetchTool(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
