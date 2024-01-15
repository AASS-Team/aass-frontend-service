<template>
	<div
		class="px-3 pb-1 bg-gray-300 rounded"
		:class="{ 'pt-8': labeled }"
	>
		<input
			:value="modelValue"
			@input="event => $emit('update:modelValue', event.target.value)"
			:type="type"
			:name="name"
			:required="required"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			class="bg-gray-300 pt-2 pb-1 text-gray-700 outline-none placeholder-gray-500 self-center align-middle w-full"
			step="any"
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
		name: {
			type: String,
			required: true
		},
		modelValue: {
			type: [Number, String]
		},
		labeled: {
			type: Boolean
		},
		required: {
			type: Boolean
		},
		placeholder: {
			type: [Number, String]
		},
		autocomplete: {
			type: [Boolean, String],
			default: undefined
		}
	}
});
</script>

<style
	scoped
	lang="scss"
>
.header {
	@apply bg-transparent p-0;

	& > input {
		@apply bg-transparent p-0 text-2xl text-black border-b-2 border-gray-300 outline-none focus:border-yellow-500 w-1/3 placeholder-gray-400;
	}
}
</style>
