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
					Analýza vzorky
					<a
						class="text-blue-600 hover:underline cursor-pointer"
						@click="$router.push({
									name: 'sample-list',
									params: {id: analysis.sample?.id}
								})"
					>
						{{ analysis.sample.name }}
					</a>
				</template>
			</h1>

			<UiLabel
				text="stav"
				labelFor="status"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-75"
				>
					&nbsp;
				</span>
				<div
					v-else
					class="relative flex items-center"
				>
					<UiStatusIcon
						:status="analysis.status"
						style="position: absolute; left: -1em"
					/>
					{{ mapStatus(analysis.status) }}
				</div>
			</UiLabel>

			<UiLabel
				text="Laboratórium"
				labelFor="lab"
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
					<a
						class="text-blue-600 hover:underline cursor-pointer"
						@click="$router.push({
									name: 'lab-list',
									params: {id: analysis.lab?.id}
								})"
					>
						{{ analysis.lab.name }}
					</a>
				</div>
			</UiLabel>

			<UiLabel
				text="Náradie"
				labelFor="tool"
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
					<ul>
						<li v-for="item in analysis.tools"
							:key="item.id">
							<a
								class="text-blue-600 hover:underline cursor-pointer"
								@click="$router.push({
									name: 'tool-list',
									params: {id: item?.id}
								})"
							>
								{{ item.name }}
							</a>
						</li>
					</ul>
				</div>
			</UiLabel>

			<div class="flex flex-row justify-end mt-5">
				<UiButton
					:disabled="this.loading"
					text="Upraviť analýzu"
					class="primary rounded-full ml-3"
					@click="
						this.$router.push({
							name: 'analysis-edit',
							params: { id: analysis?.id }
						})
					"
				></UiButton>
				<UiButton
					:disabled="this.loading"
					text="Vymazať analýzu"
					class="danger rounded-full ml-3"
					@click="confirmDelete"
				></UiButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import UiStatusIcon from '@/components/ui/UiStatusIcon.vue';
import MapStatus from "@/mixins/MapStatus.mixin";

export default defineComponent({
	components: {
		UiButton,
		UiLabel,
		UiStatusIcon
	},
	mixins: [MapStatus],
	data: () => {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('AnalysisStore', ['analysis'])
	},
	methods: {
		...mapActions('AppStore', ['setAlert']),
		...mapActions('AnalysisStore', ['fetchAnalysis', 'deleteAnalysis', 'resetState']),

		confirmDelete() {
			if (confirm('Chcete vymazať analýzu?')) {
				this.deleteAnalysis(this.analysis.id).then(() => {
					return this.$router.push({
						name: 'analysis-list'
					});
				});
			}
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		this.fetchAnalysis(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
