import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    isTableBusy: false,
    items: [],
    pagination: {
      current: 1,
      total: 0
    },
    filters: {
      column: '',
      sort: '',
      query: ''
    }
  },
  actions: {
    async getData({state, commit}){
      let response = await axios.get('data', {params: state.filters})
      if(response.data){
        commit('setData', response.data.items)
        commit('setTotal', response.data.total)
      }
    },
    async addItem({commit}, payload){
      let response = await axios.post('data', payload)
      console.log('addItem --> response', response)
    },
    async onDelete({commit}, id){
      let response = await axios.delete(`data/${id}`)
      console.log('onDelete --> response', response)
    }
  },
  mutations: {
    setData(state, payload){
      state.items = payload
    },
    setTotal(state, payload){
      state.pagination.total = payload
    }
  },
  modules: {
  }
})
