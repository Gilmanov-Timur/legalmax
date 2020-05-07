import VueRouter from 'vue-router'
import i18n from '../i18n'

const availableLocales = i18n.availableLocales.join('|')
const withPrefix = (prefix, routes) =>
	routes.map( (route) => {
		route.path = prefix + route.path;
		return route;
	});

const router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: `/${i18n.locale}`
		},
		...withPrefix(`/:language(${availableLocales})`,[
			{
				path: '/',
				component: () => import('../components/Home')
			}
		]),
		{
			path: '*',
			component: () => import('../components/Error')
		}
	]
})

router.beforeEach((to, from, next) => {
	const language = to.params.language

	if (i18n.availableLocales.indexOf(language) !== -1 && i18n.locale !== language) {
		i18n.locale = language;
	}

	return next();
});

export default router