export default {
    coachList(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },
    selectedCoachData: (state, otherGetters) => coachId => {
        const coachList = otherGetters.coachList;
        return coachList.find(coach => coach.id == coachId);
    }
    // TESTS
    // randomNumber(state) {
    //     return state.randomN + 10;
    // },
    // getNumber: (state, getters) => num => {
    //     return getters.randomNumber + state.random2N + num;
    // }
};
