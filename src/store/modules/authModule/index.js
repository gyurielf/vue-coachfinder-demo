import authGetters from '@/store/modules/authModule/getters';
import authActions from '@/store/modules/authModule/actions';
import authMutations from '@/store/modules/authModule/mutations';

const authModule = {
    namespaced: true,
    state() {
        return {};
    },
    mutations: authMutations,
    actions: authActions,
    getters: authGetters
};

export default authModule;
