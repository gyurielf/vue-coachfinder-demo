import requestsGetters from '@/store/modules/requestsModule/getters';
import requestsActions from '@/store/modules/requestsModule/actions';
import requestsMutations from '@/store/modules/requestsModule/mutations';

const requestsModule = {
    namespaced: true,
    state() {
        return {};
    },
    mutations: requestsMutations,
    actions: requestsActions,
    getters: requestsGetters
};

export default requestsModule;
