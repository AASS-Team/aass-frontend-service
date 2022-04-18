<template>
	<div class="mt-10">
		<p
			class="uppercase text-sm text-gray-500 font-bold mb-2 pl-6"
			:class="isNavigationCollapsed ? 'hidden' : ''"
		>
			{{ group.title }}
		</p>

		<NavigationItem
			v-for="item in group.items"
			:key="item.name"
			:item="item"
		></NavigationItem>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NavigationGroup } from '@/store/app/app.types';
import NavigationItem from '@/components/Navigation/NavigationItem.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	components: {
		NavigationItem
	},
	props: {
		group: {
			type: Object as PropType<NavigationGroup>,
			required: true
		}
	},
	computed: {
		...mapGetters('AppStore', ['isNavigationCollapsed'])
	}
});
</script>
