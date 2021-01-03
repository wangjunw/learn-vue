import Vue from 'vue';
import Vuex from '../libs/Vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 2
    },
    mutations: {
        add(state, payload) {
            state.count += payload;
        }
    },
    actions: {
        addAsync({ commit }, payload) {
            setTimeout(() => {
                commit('add', payload);
            }, 1000);
        }
    },
    getters: {
        doubleCount: state => {
            return state.count * 2;
        }
    }
});