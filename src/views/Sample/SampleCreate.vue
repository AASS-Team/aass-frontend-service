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
					<UiSelect
						name="user"
						:options="users"
						class="text-gray-700 w-1/4"
						required>
					</UiSelect>
				</UiLabel>

				<UiLabel
					text="Grant"
					labelFor="grant"
					class="2 items-center"
				>
					<UiSelect
						name="grant"
						:options="grants"
						class="text-gray-700 w-1/4">
					</UiSelect>
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
import UiSelect from "@/components/ui/UiSelect.vue";

export default defineComponent({
	components: {
		UiSelect,
		UiButton,
		UiLabel
	},
	data() {
		return {
			saving: false,
			sample: {
				name: undefined,
				address: undefined
			},
			users: [
				{
					id: 'f7d9caf4-9101-4fe5-859a-f286272640a3',
					first_name: 'Nikoleta',
					last_name: 'Hroncova',
					email: 'nikoleta@gmail.com'
				},
				{
					id: 'f7d9caf4-9101-4fe5-859a-f286272640b3',
					first_name: 'Petra',
					last_name: 'Hroncova',
					email: 'petra@gmail.com'
				},
			],
			grants: [
				{
					id: 'f7d9caf4-9101-4fe5-859a-f286272640a3',
					name: 'NBU',
				},
				{
					id: 'f7d9caf4-9101-4fe5-859a-f286272640b3',
					name: 'STU',
				},
			]
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
