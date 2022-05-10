<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<UiInput
					v-else
					v-model="sample.name"
					name="name"
					type="text"
					class="header"
					placeholder="Nepomenovaná vzorka"
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
					text="Množstvo"
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
						type="number"
						required
					/>
					<span class="ml-3 text-gray-500 text-sm">ml</span>
				</UiLabel>

				<UiLabel
					text="Poznamka"
					labelFor="note"
					class="mt-2"
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
import UiSelect from '@/components/ui/UiSelect.vue';
import UiInput from '@/components/ui/UiInput.vue';
import { User } from '@/store/user/user.types';
import { Grant } from '@/store/grant/grant.types';
import { Sample } from '@/store/sample/sample.types';

export default defineComponent({
	components: {
		UiSelect,
		UiButton,
		UiLabel,
		UiInput
	},
	data() {
		return {
			loading: true,
			saving: false,
			sample: {}
		};
	},
	computed: {
		...mapGetters('GrantStore', ['grants']),
		...mapGetters('UserStore', ['users'])
	},
	methods: {
		...mapActions('SampleStore', ['saveSample', 'resetState']),
		...mapActions('GrantStore', ['fetchGrants']),
		...mapActions('UserStore', ['fetchUsers']),
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
	mounted() {
		// initial loader
		this.loading = true;

		// fetch data from BE
		Promise.all([this.fetchGrants(), this.fetchUsers()]).then(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
