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
					v-model="sample.name"
					name="name"
					type="text"
					class="header"
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
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="user"
						:options="users"
						:selected="sample.user.id"
						@select="onUserSelect"
						class="text-gray-700 w-1/4"
						required
					>
					</UiSelect>
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
					<UiSelect
						v-else
						name="grant"
						:options="grants"
						:selected="sample.grant?.id"
						@select="onGrantSelect"
						class="text-gray-700 w-1/4"
					>
					</UiSelect>
					<span class="ml-3 text-gray-500 text-sm"
						>(v prípade že ste samoplatca, túto možnosť
						nevyberajte)</span
					>
				</UiLabel>

				<UiLabel
					text="Množtvo"
					labelFor="amount"
					class="items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						v-else
						v-model="sample.amount"
						name="amount"
						type="text"
						required
					/>
					<span
						class="ml-3 text-gray-500 text-sm inline-block align-baseline"
						>ml</span
					>
				</UiLabel>

				<UiLabel
					text="Poznámka"
					labelFor="note"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<textarea
						v-else
						v-model="sample.note"
						name="note"
						class="text-gray-700 w-2/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
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
import UiSelect from '@/components/ui/UiSelect.vue';
import { mapActions, mapGetters } from 'vuex';
import UiInput from '@/components/ui/UiInput.vue';
import { Sample } from '@/store/sample/sample.types';
import { Grant } from '@/store/grant/grant.types';
import { User } from '@/store/user/user.types';

export default defineComponent({
	components: {
		UiButton,
		UiLabel,
		UiSelect,
		UiInput
	},
	data: () => {
		return {
			saving: false,
			loading: true
		};
	},
	computed: {
		...mapGetters('SampleStore', ['sample']),
		...mapGetters('GrantStore', ['grants']),
		...mapGetters('UserStore', ['users'])
	},
	methods: {
		...mapActions('SampleStore', [
			'fetchSample',
			'updateSample',
			'resetState'
		]),
		...mapActions('GrantStore', ['fetchGrants']),
		...mapActions('UserStore', ['fetchUsers']),
		...mapActions('AppStore', ['setAlert']),

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateSample({
					id: this.sample.id,
					sample: this.sample
				}).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'sample-detail',
						params: { id: this.sample.id }
					});
				});
			} else {
				this.saving = false;
				(this.$refs.form as HTMLFormElement).reportValidity();
			}
		},

		onGrantSelect(id: string) {
			(this.sample as Sample).grant = this.grants.find(
				(g: Grant) => g.id == id
			);
		},

		onUserSelect(id: string) {
			(this.sample as Sample).user = this.users.find(
				(u: User) => u.id == id
			);
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;

		// fetch data from BE
		Promise.all([
			this.fetchSample(this.$route.params.id),
			this.fetchUsers(),
			this.fetchGrants()
		]).then(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
