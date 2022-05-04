<template>
	<div
		class="px-3 pb-1 bg-gray-300 rounded"
	>
		<input
			:type="type"
			:required="required"
			:name="name"
			:value="value"
			class="bg-gray-300 pt-2 pb-1 text-gray-700 outline-none placeholder-gray-500 self-center align-middle w-full"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		type: {
			type: String,
			required: true
		},
		required: {
			type: Boolean,
		},
		name: {
			type: String,
		},
		value: {
			type: String
		}
	}
});
</script>
