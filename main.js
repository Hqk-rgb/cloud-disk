import App from './App'
import {
	createSSRApp
} from 'vue'
//引入Vuex
import store from './store'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app
	}
}
