import Vue from 'vue';
import App from './App';
import Vuerouter from 'vue-router';
import Vueresource from 'vue-resource';

import goods from 'components/goods/goods'; // 注意 webpack.base.conf.js 里路径的配置
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

// 安装 vue-router
Vue.use(Vuerouter);
Vue.use(Vueresource);

// /* eslint-disable no-new */
// new Vue({
// 	el: '#app',
// 	components: {App}
// });

let app = Vue.extend(App);
let router = new Vuerouter({
	linkActiveClass: 'active' // v-link-active 配置
});
// 定义路由
router.map({
	'/goods': {
		// 此处为component，不是components
		component: goods
	},
	'/ratings': {
		component: ratings
	},
	'/seller': {
		component: seller
	}
});

router.start(app, '#app');
// router.go('/goods');
