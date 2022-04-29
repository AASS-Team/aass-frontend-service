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
								path: 'new',
								name: 'lab-new',
								meta: {
									title: 'Nové laboratórium'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabCreate" */ '@/views/Administration/Lab/LabCreate.vue'
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
										/* webpackChunkName: "LabDetail" */ '@/views/Administration/Lab/LabDetail.vue'
									)
							},
							{
								path: ':id/edit',
								name: 'lab-edit',
								meta: {
									title: 'Upraviť laboratórium'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabEdit" */ '@/views/Administration/Lab/LabEdit.vue'
									)
							},
						]
					},
					{
						path: 'tools',
						component: RouterView,
						children: [
							{
								path: '',
								name: 'tool-list',
								meta: {
									title: 'Nástroje'
								},
								component: () =>
									import(
										'@/views/Administration/Tool/ToolList.vue'
									)
							},
							{
								path: ':id',
								name: 'tool-detail',
								meta: {
									title: 'Detail nástroja'
								},
								component: () =>
									import(
										'@/views/Administration/Tool/ToolDetail.vue'
									)
							},
							{
								path: 'new',
								name: 'tool-new',
								meta: {
									title: 'Nový nástroj'
								},
								component: () =>
									import(
										'@/views/Administration/Tool/ToolCreate.vue'
									)
							},
							{
								path: ':id/edit',
								name: 'tool-edit',
								meta: {
									title: 'Upraviť nástroj'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabEdit" */ '@/views/Administration/Tool/ToolEdit.vue'
									)
							},
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
