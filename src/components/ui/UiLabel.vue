<template>
	<div class="flex pb-3 flex-row">
		<label
			class="uppercase font-bold text-gray-500 text-sm block mr-2 w-1/5"
			:for="labelFor"
		>
			{{ text }}
		</label>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		labelFor: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	}
});
</script>
