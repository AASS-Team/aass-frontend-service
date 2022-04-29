<template>
	<div class="bg-gray-300 rounded flex flex-row items-center relative">
		<select
			class="bg-gray-300 focus:outline-none block w-full p-2 hover:cursor-pointer"
			style="
				-moz-appearance: none;
				-webkit-appearance: none;
				appearance: none;
			"
			:name="name"
			:required="required"
		>
			<option
				value=""
				:hidden="required"
				:disabled="required"
				:selected="selected === undefined"
			>
				Vyberte možnosť...
			</option>

			<option
				v-for="option in options"
				:key="option.id"
				value="{{option.id}}"
				:selected="selected === option.id"
			>
				{{ option.name || option.first_name}}
			</option>
		</select>

		<fa-icon
			:icon="['fas', 'caret-down']"
			class="text-gray-700 absolute bg-gray-300 block pl-2 pr-1"
			style="right: 0.3em; pointer-events: none"
		></fa-icon>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true
		},
		required: {
			type: Boolean
		},
		selected: {
			type: String
		},
		options: {
			type: Object,
			required: true
		}
	}
});
</script>
