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
        return {};
    }
});

export default store;
