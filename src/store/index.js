import { createStore } from 'vuex';
import authModule from '@/store/modules/authModule';
import requestsModule from '@/store/modules/requestsModule';
import coachesModule from '@/store/modules/coachesModule';

const store = createStore({
    modules: {
        authModule,
        coachesModule,
        requestsModule
    },
    state() {
        return {
            // userId: 'nda3211',
            globalModalStatus: {
                active: false,
                show: false
            }
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        globalModalStatus(state) {
            return state.globalModalStatus;
        }
    },
    mutations: {
        toggleGlobalModalActive(state) {
            state.globalModalStatus.active = !state.globalModalStatus.active;
        },
        toggleGlobalModalShow(state) {
            state.globalModalStatus.show = !state.globalModalStatus.show;
        }
    },
    actions: {
        toggleGlobalModalActive(context) {
            context.commit('toggleGlobalModalActive');
        },
        toggleGlobalModalShow(context) {
            context.commit('toggleGlobalModalShow');
        }
    }
});

export default store;
