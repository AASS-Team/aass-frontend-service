<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<input
					:value="sample.name"
					name="name"
					type="text"
					class="text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 w-1/3"
					required
					placeholder="Nepomenovaná vzorka"
				/>

				<UiLabel
					text="Používatel"
					labelFor="user"
					class="mt-10"
				>


					<select
						:value="sample.user"
						name="user"
						class="text-gray-700 w-1/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
						required>
						<option value="Ferko">Red</option>
						<option value="Karin">Blue</option>
						<option value="Nikca">Yellow</option>
					</select>


				</UiLabel>

				<UiLabel
					text="Grant"
					labelFor="grant"
					class="2 items-center"
				>
					<select
						:value="sample.grant"
						name="grant"
						class="text-gray-700 w-1/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
						required>
						<option value="Ferko">Red</option>
						<option value="Karin">Blue</option>
						<option value="Nikca">Yellow</option>
					</select>
					<span
						class="ml-3 text-gray-500 text-sm ">(v prípade že ste samoplatca, túto možnosť nevyberajte)</span>

				</UiLabel>
				<UiLabel
					text="Množstvo"
					labelFor="amount"
					class="2 items-center"
				>
					<input
						:value="sample.amount"
						name="amount"
						class="text-gray-700 w-1/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
						required
					/>
					<span class="ml-3 text-gray-500 text-sm ">ml</span>
				</UiLabel>

				<UiLabel
					text="Poznamka"
					labelFor="note"
					class="mt-2"
				>
					<textarea
						:value="sample.note"
						name="note"
						class="text-gray-700 w-2/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
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
import {defineComponent} from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import {mapActions} from 'vuex';

export default defineComponent({
	components: {
		UiButton,
		UiLabel
	},
	data() {
		return {
			saving: false,
			sample: {
				name: undefined,
				address: undefined
			}
		};
	},
	methods: {
		...mapActions('SampleStore', ['saveSample', 'resetState']),
		...mapActions('AppStore', ['setAlert']),

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.saveSample(this.sample).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'sample-list'
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
