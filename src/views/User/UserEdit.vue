<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<UiLabel
					text="Meno"
					labelFor="first_name"
					class="items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						type="text"
						v-else
						v-model="user.first_name"
						name="first_name"
						required
					/>
				</UiLabel>

				<UiLabel
					text="Priezvisko"
					labelFor="last_name"
					class="items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiInput
						type="text"
						v-else
						v-model="user.last_name"
						name="last_name"
						required
					/>
				</UiLabel>

				<UiLabel
					text="E-mail"
					labelFor="email"
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
						v-model="user.email"
						name="email"
						required
						type="text"
					/>
				</UiLabel>

				<UiLabel
					text="Rola"
					labelFor="groups"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="groups"
						:selected="user.groups[0]?.id"
						@select="onGroupSelect"
						:options="groups"
						:required="true"
						class="w-1/4 text-gray-700"
					></UiSelect>
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
import UiSelect from '@/components/ui/UiSelect.vue';
import { UserGroup } from '@/store/user/user.types';

export default defineComponent({
	components: {
		UiInput,
		UiButton,
		UiLabel,
		UiSelect
	},
	data: () => {
		return {
			saving: false,
			loading: true
		};
	},
	computed: {
		...mapGetters('UserStore', ['user', 'groups'])
	},
	methods: {
		...mapActions('UserStore', [
			'fetchUser',
			'updateUser',
			'resetState',
			'fetchGroups'
		]),
		...mapActions('UserStore', ['fetchUser']),
		...mapActions('AppStore', ['setAlert']),

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateUser({
					id: this.user.id,
					user: this.user
				}).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'user-detail',
						params: { id: this.user.id }
					});
				});
			} else {
				this.saving = false;
				(this.$refs.form as HTMLFormElement).reportValidity();
			}
		},

		onGroupSelect(id: number) {
			this.user.groups[0] = this.groups.find(
				(g: UserGroup) => g.id == id
			);
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		Promise.all([
			this.fetchUser(this.$route.params.id),
			this.fetchGroups()
		]).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
