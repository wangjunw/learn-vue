import Vue from 'vue';
// import Vuex from '../libs/Vuex';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
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
}