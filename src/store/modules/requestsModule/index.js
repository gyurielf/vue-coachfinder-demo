import requestsGetters from '@/store/modules/requestsModule/getters';
import requestsActions from '@/store/modules/requestsModule/actions';
import requestsMutations from '@/store/modules/requestsModule/mutations';

const requestsModule = {
    namespaced: true,
    state() {
        return {
            requests: [
                // {
                //     id: 9987,
                //     email: 'blabla@gmail.com',
                //     subject: 'tenisz',
                //     message: 'hello, szopol-e borert ?',
                //     coachId: 'nda3211'
                // },
                // {
                //     id: 9988,
                //     email: 'hihihi@gmail.com',
                //     subject: 'kosarlabda',
                //     message: 'bor, joska, turo',
                //     coachId: 'nda3211'
                // },
                // {
                //     id: 9989,
                //     email: 'wewewew@gmail.com',
                //     subject: 'foci',
                //     message: 'kecske, kacsa, veder',
                //     coachId: 'nda3211'
                // }
            ]
        };
    },
    mutations: requestsMutations,
    actions: requestsActions,
    getters: requestsGetters
};

export default requestsModule;
