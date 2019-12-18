import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../uilt/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		giwe_status:storage.getDraw()
	},
  mutations: {
		steGiweStatus(state,payload){
			state.giwe_status = payload
		}
	},
  actions: {
		
  },
  getters: {},
  modules: {

  }
})
