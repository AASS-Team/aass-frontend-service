<template>
	<div
		class="h-2 w-2 rounded-full inline-block"
		:class="{
			'bg-red-500': available === false,
			'bg-yellow-500': status === AnalysisStatus.IN_PROGRESS,
			'bg-white border border-gray-600':
				status === AnalysisStatus.PENDING,
			'bg-green-500':
				status === AnalysisStatus.FINISHED || available === true
		}"
	></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { AnalysisStatus } from '@/types/analysis-status.enum';

export default defineComponent({
	data() {
		return {
			AnalysisStatus: AnalysisStatus
		};
	},
	props: {
		status: {
			type: String as PropType<AnalysisStatus>
		},
		available: {
			type: Boolean,
			default: undefined
		}
	}
});
</script>
