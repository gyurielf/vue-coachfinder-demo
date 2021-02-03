export default {
    coachList(state) {
        return state.coaches;
    },
    listSelectedCoachData: (state, otherGetters) => coachId => {
        const coachList = otherGetters.coachList;
        return coachList.find(coach => coach.id == coachId);
    }
    // randomNumber(state) {
    //     return state.randomN + 10;
    // },
    // getNumber: (state, getters) => num => {
    //     return getters.randomNumber + state.random2N + num;
    // }
};
