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
      total: 0,
      pages: 0,
    },
    sorting: {
      name: 0,
      quantity: 0,
      distance: 0,
    },
    skip: 0,
    take: 10,
    filters: {
      column: '',
      condition: '',
      query: ''
    },
    error: false,
  },
  actions: {
    async getData({state, commit}){
      try {
        let response = await axios.get(`data?take=${state.take}&skip=${state.take * (state.pagination.current - 1)}&name=${state.sorting.name === 1 ? 'ASC' : state.sorting.name === 2 ? 'DESC' : ''}&quantity=${state.sorting.quantity === 1 ? 'DESC' : state.sorting.quantity === 2 ? 'ASC' : ''}&distance=${state.sorting.distance === 1 ? 'DESC' : state.sorting.distance === 2 ? 'ASC' : ''}`, {params: state.filters})
        if(response.data){
          commit('setData', response.data.items)
          commit('setTotal', response.data.total)
          commit('setError', false)
        }
      } catch (error) {
        commit('setError', true)
        commit('setData', error.response.data.items)
        commit('setTotal', error.response.data.total)
        
      }
    },
    async addItem({commit}, payload){
      let response = await axios.post('data', payload)
      return response.data
    },
    async editItem({commit}, payload){
      let response = await axios.put(`data/${payload.id}`, payload)
      return response.data
    },
    async onDelete({commit}, id){
      let response = await axios.delete(`data/${id}`)
      return response.data
    }
  },
  mutations: {
    setData(state, payload){
      state.items = payload
    },
    setPage(state, payload){
      state.pagination.current = payload
    },
    setNextPage(state,){
      state.pagination.current++
    },
    setPrevPage(state,){
      state.pagination.current--
    },
    setTotal(state, payload){
      state.pagination.pages = Math.ceil(payload / state.take)
      state.pagination.total = payload
    },
    setTake(state, payload){
      state.take = payload
      state.skip = 0
    },
    setFilters(state, payload){
      state.filters[payload.type] = payload.value
      state.pagination.current = 1
    },
    setQuery(state, payload){
      state.filters.query = payload
      state.pagination.current = 1
    },
    setError(state, payload){
      state.error = payload
    },
    setSorting(state, payload){
      state.sorting = payload
    }
  },
  modules: {
  }
})
