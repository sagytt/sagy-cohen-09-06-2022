import { createStore } from 'vuex'

export default createStore({
  state: {
    favourites: [],
    isMetric: true
  },
  getters: {
    getFavourites(state){
      return state.favourites;
    },
    isMetric(state){
      return state.isMetric
    }
  },
  mutations: {
    add(state, fave){
      state.favourites = [...state.favourites, fave];
    },
    remove(state, fave){
      state.favourites = state.favourites.filter(f => f.LocalizedName !== fave.LocalizedName);
    },
    updateMetric(state, update){
      state.isMetric = update
    }
  },
  actions: {
    addFavourite(context, fave){
      context.commit('add', fave);
    },
    removeFavourite(context, fave){
      context.commit('remove', fave);
    },
    setMetric(context, update){
      context.commit('updateMetric', update);
    }
  },
  modules: {
  }
})
