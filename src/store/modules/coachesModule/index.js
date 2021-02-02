import coachesMutations from '@/store/modules/coachesModule/mutations';
import coachesActions from '@/store/modules/coachesModule/actions';
import coachesGetters from '@/store/modules/coachesModule/getters';

const coachesModule = {
    namespaced: true,
    state() {
        return {
            coaches: []
            // selectedCoach: null,
            // randomN: 88,
            // random2N: 2
        };
    },
    mutations: coachesMutations,
    actions: coachesActions,
    getters: coachesGetters
};

export default coachesModule;
