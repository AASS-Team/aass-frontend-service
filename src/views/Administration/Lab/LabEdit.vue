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
				<input
					v-else
					v-model="lab.name"
					name="name"
					type="text"
					class="text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 w-1/3"
					required
				/>

				<UiLabel
					text="Adresa"
					labelFor="address"
					class="mt-10"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<input
						v-else
						v-model="lab.address"
						name="address"
						class="text-gray-700 w-1/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
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

export default defineComponent({
	components: {
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
		...mapGetters('LabStore', ['lab'])
	},
	methods: {
		...mapActions('LabStore', ['fetchLab', 'updateLab', 'resetState']),
		...mapActions('AppStore', ['setAlert']),
		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateLab({ id: this.lab.id, lab: this.lab }).then(
					() => {
						this.saving = false;
						return this.$router.push({
							name: 'lab-detail',
							params: { id: this.lab.id }
						});
					}
				);
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
		this.fetchLab(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
