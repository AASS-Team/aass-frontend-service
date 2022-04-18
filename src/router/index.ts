import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/samples'
	},
	{
		path: '/samples',
		name: 'sample-list',
		component: () =>
			import(
				/* webpackChunkName: "SampleList" */ '../views/Sample/SampleList.vue'
			)
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
