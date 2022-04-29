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
					:value="sample.name"
					name="name"
					type="text"
					class="text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 w-1/3"
					required
				/>
				<UiLabel
					text="Používatel"
					labelFor="user"
					class="mt-10"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>					</span>




				</UiLabel>

				<UiLabel
					text="Grant"
					labelFor="grant"
					class="2 items-center"
				>
						<span
							v-if="this.loading"
							class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
						>
						&nbsp;
					</span>

					<span
						class="ml-3 text-gray-500 text-sm ">(v prípade že ste samoplatca, túto možnosť nevyberajte)</span>

				</UiLabel>
				<UiLabel
					text="Množtvo"
					labelFor="amount"
					class="mt-10 items-center "

				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<input
						v-else
						:value="sample.amount"
						name="address"
						class="text-gray-700 w-1/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500 "
						required
					/>
					<span class="ml-3  text-gray-500 text-sm inline-block align-baseline ">ml</span>
				</UiLabel>

				<UiLabel
					text="Poznámka"
					labelFor="note"
					class="mt-10"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<textarea
						v-else
						:value="sample.note"
						name="note"
						class="text-gray-700 w-2/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
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
import {defineComponent} from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import {mapActions, mapGetters} from 'vuex';

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
		...mapGetters('SampleStore', ['sample'])
	},
	methods: {
		...mapActions('SampleStore', ['fetchSample', 'updateSample', 'resetState']),
		...mapActions('AppStore', ['setAlert']),
		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateSample({id: this.sample.id, sample: this.sample}).then(
					() => {
						this.saving = false;
						return this.$router.push({
							name: 'sample-detail',
							params: {id: this.sample.id}
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
		this.fetchSample(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
