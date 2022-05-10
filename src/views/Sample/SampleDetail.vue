<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<h1 class="text-2xl mb-10">
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-3/4 h-full"
				>
					&nbsp;
				</span>
				<template v-else>
					{{ sample.name }}
				</template>
			</h1>
			<UiLabel
				text="Používateľ"
				labelFor="user"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<div
					v-else
					class="relative flex items-center"
				>
					<router-link
						v-if="sample.user"
						:to="{ name: 'user-detail', params: {id: sample.user.id} }"
						class="text-blue-600 hover:underline"
					>
						{{ sample.user.name }}
					</router-link>
				</div>
			</UiLabel>

			<UiLabel
				text="Grant"
				labelFor="grant"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<div
					v-else
					class="relative flex items-center"
				>
					<router-link
						v-if="sample.grant"
						:to="{ name: 'grant-detail', params: {id: sample.grant.id} }"
						class="text-blue-600 hover:underline"
					>
						{{ sample.grant.name }}
					</router-link>
				</div>
			</UiLabel>

			<UiLabel
				text="Množstvo"
				labelFor="amount"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<div
					v-else
					class="relative flex items-center"
				>
					<p>
						{{ sample.amount }}
					</p>
					<span class="ml-3 text-gray-500">ml</span>
				</div>

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
					name="note"
					class="text-gray-700 w-2/3 bg-gray-300 p-2 rounded focus:outline-none placeholder-gray-500"
					disabled
					rows="4"
					:value="sample.note"
				></textarea>
			</UiLabel>

			<div class="flex flex-row justify-end mt-5">
				<UiButton
					:disabled="this.loading"
					text="Upraviť"
					class="primary rounded-full ml-3"
					@click="
						this.$router.push({
							name: 'sample-edit',
							params: { id: sample?.id }
						})
					"
				></UiButton>
				<UiButton
					:disabled="this.loading"
					text="Vymazať"
					class="danger rounded-full ml-3"
					@click="confirmDelete"
				></UiButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapActions, mapGetters} from 'vuex';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';

export default defineComponent({
	components: {
		UiButton,
		UiLabel,
	},
	data: () => {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('SampleStore', ['sample'])
	},
	methods: {
		...mapActions('AppStore', ['setAlert']),
		...mapActions('SampleStore', ['fetchSample', 'deleteSample', 'resetState']),

		confirmDelete() {
			if (confirm('Chcete vymazať tuto vzorku?')) {
				this.deleteSample(this.sample.id).then(() => {
					return this.$router.push({
						name: 'sample-list'
					});
				});
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
