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
				<h1
					v-else
					class="text-2xl mb-10"
				>
					Upraviť analýzu
				</h1>

				<UiLabel
					text="Vzorka"
					labelFor="sample"
					class="mt-10 items-center"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="sample"
						:options="samples"
						key="vzorka"
						:selected="analysis.sample.id"
						@select="onSampleSelect"
						:required="true"
						class="w-1/4 text-gray-700"
					></UiSelect>
				</UiLabel>

				<UiLabel
					text="Laborant"
					labelFor="laborant"
					key="laborant"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="laborant"
						:options="users"
						:required="true"
						:selected="analysis.laborant.id"
						@select="onUserSelect"
						class="w-1/4 text-gray-700"
					></UiSelect>
				</UiLabel>

				<UiLabel
					text="Laboratórium"
					labelFor="lab"
					key="laboratórium"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="lab"
						:required="true"
						:options="labs"
						:selected="analysis.lab.id"
						@select="onLabSelect"
						class="w-1/4 text-gray-700"
					></UiSelect>
				</UiLabel>

				<slot>
					<UiLabel
						text="Náradie"
						key="náradie"
						labelFor="tools"
					>
						<div class="flex-col w-1/4">
							<div
								id="toolsWrapper"
								class="flex-col"
							>
								<span
									v-if="this.loading"
									class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
								>
									&nbsp;
								</span>
								<div
									v-for="(item, index) in analysis.tools"
									:key="item.id"
									class="flex flex-row relative items-center mb-3"
									v-else
								>
									<UiSelect
										class="w-full text-gray-700"
										:options="tools"
										:selected="item.id"
										@select="t => onToolSelect(index, t)"
										name="tools"
										:required="true"
									/>
									<a
										class="absolute text-xl remove-tool-btn cursor-pointer"
										style="right: -1em"
										@click="deleteTool(index)"
										>&times;</a
									>
								</div>
							</div>
							<UiButton
								text="+ Pridať nástroj"
								@click="addTool()"
								class="rounded-full secondary"
							/>
						</div>
					</UiLabel>
				</slot>

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
import { Sample } from '@/store/sample/sample.types';
import { Analysis } from '@/store/analysis/analysis.types';
import { Tool } from '@/store/tool/tool.types';
import { User } from '@/store/user/user.types';
import { Lab } from '@/store/lab/lab.types';

export default defineComponent({
	components: {
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
		...mapGetters('AnalysisStore', ['analysis']),
		...mapGetters('LabStore', ['labs']),
		...mapGetters('ToolStore', ['tools']),
		...mapGetters('SampleStore', ['samples']),
		...mapGetters('UserStore', ['users'])
	},
	methods: {
		...mapActions('AnalysisStore', [
			'fetchAnalysis',
			'updateAnalysis',
			'resetState'
		]),
		...mapActions('AppStore', ['setAlert']),
		...mapActions('LabStore', ['fetchLabs']),
		...mapActions('ToolStore', ['fetchTools']),
		...mapActions('SampleStore', ['fetchSamples']),
		...mapActions('UserStore', ['fetchUsers']),

		addTool: function () {
			this.analysis.tools.push({});
		},

		deleteTool: function (index: number) {
			this.analysis.tools = this.analysis.tools.splice(index, 1);
		},

		onSampleSelect(id: string) {
			(this.analysis as Analysis).sample = this.samples.find(
				(s: Sample) => s.id == id
			);
		},

		onLabSelect(id: string) {
			(this.analysis as Analysis).lab = this.labs.find(
				(l: Lab) => l.id == id
			);
		},

		onUserSelect(id: string) {
			(this.analysis as Analysis).laborant = this.users.find(
				(u: User) => u.id == id
			);
		},

		onToolSelect(index: number, id: string) {
			(this.analysis as Analysis).tools[index] = this.tools.find(
				(t: Tool) => t.id == id
			);
		},

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.updateAnalysis({
					id: this.analysis.id,
					analysis: this.analysis
				}).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'analysis-detail',
						params: { id: this.analysis.id }
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

		Promise.all([
			this.fetchAnalysis(this.$route.params.id),
			this.fetchLabs(),
			this.fetchTools(),
			this.fetchSamples(),
			this.fetchUsers()
		]).then(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
