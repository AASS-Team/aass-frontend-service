import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouterView
} from 'vue-router';
import BaseView from '@/views/BaseView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/samples'
	},
	{
		path: '/',
		component: BaseView,
		children: [
			{
				path: '/samples',
				name: 'sample-list',
				meta: {
					title: 'Vzorky'
				},
				component: () =>
					import(
						/* webpackChunkName: "SampleList" */ '@/views/Sample/SampleList.vue'
					)
			},
			{
				path: '/administration',
				component: RouterView,
				children: [
					{
						path: '',
						meta: {
							title: 'Správa laboratórií'
						},
						component: () =>
							import(
								/* webpackChunkName: "Administration" */ '@/views/Administration/Administration.vue'
							)
					},
					{
						path: 'labs',
						component: RouterView,
						children: [
							{
								path: '',
								name: 'lab-list',
								meta: {
									title: 'Laboratória'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabList" */ '@/views/Administration/Lab/LabList.vue'
									)
							},

							{
								path: ':id',
								name: 'lab-detail',
								meta: {
									title: 'Detail laboratória'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabCreate" */ '@/views/Administration/Lab/LabDetail.vue'
									)
							}
						]
					}
				]
			}
		]
	},
	{
		path: '/404',
		name: '404',
		meta: {
			title: 'Stránka nenájdená'
		},
		component: () =>
			import(
				/* webpackChunkName: "PageNotFound" */ '@/views/PageNotFoundView.vue'
			)
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404'
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(to => {
	document.title = to.meta.title
		? `${to.meta.title} | ${process.env.VUE_APP_NAME}`
		: process.env.VUE_APP_NAME;
});

export default router;
