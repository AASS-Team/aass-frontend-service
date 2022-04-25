<template>
	<div
		class="flex flex-col"
		:data-collapsed="isNavigationCollapsed"
	>
		<router-link
			:to="item.path"
			class="flex items-center justify-center py-2 hover:bg-gray-700 text-gray-600 hover:text-gray-500"
			:class="
				isNavigationCollapsed
					? 'flex-col h-20 justify-center py-3'
					: 'px-6 '
			"
		>
			<div
				:class="
					isNavigationCollapsed
						? 'w-full text-center text-2xl'
						: 'w-1/6'
				"
			>
				<fa-icon :icon="item.icon" />
			</div>
			<span
				:hidden="isNavigationCollapsed"
				:class="
					isNavigationCollapsed
						? 'w-full text-center mt-2 px-1 '
						: 'pl-1'
				"
				class="text-md w-5/6"
			>
				{{ item.title }}
			</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NavigationItem } from '@/store/app/app.types';
import { mapGetters } from 'vuex';

export default defineComponent({
	props: {
		item: {
			type: Object as PropType<NavigationItem>,
			required: true
		}
	},
	computed: {
		...mapGetters('AppStore', ['isNavigationCollapsed'])
	}
});
</script>

<style
	scoped
	lang="scss"
>
.router-link-active {
	svg {
		@apply text-yellow-500;
	}
	@apply bg-gray-700 text-gray-500 border-r-4 border-yellow-500;
}

:not([data-collapsed]) > .router-link-active {
	@apply border-r-4 border-yellow-500;
}
</style>
