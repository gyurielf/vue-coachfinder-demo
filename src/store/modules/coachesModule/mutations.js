export default {
    getCoaches(state, payload) {
        state.coaches = payload[Object.keys(payload)[0]];
        // console.log(state.coaches);
    }

    // async getCoachData(state) {
    //     try {
    //         const response = await fetch(
    //             'https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    //         );
    //         await response.json().then(data => {
    //             const results = data[Object.keys(data)[0]];
    //             state.selectedCoach = results.find(
    //                 coach => coach.id == this.coachId
    //             );
    //         });
    //     } catch (e) {
    //         const error = e.toString();
    //         console.log(error);
    //     }
    // },

    /*getCoachData(state, payload) {
        // const results = payload[Object.keys(payload)[0]];
        // state.selectedCoach = results.find(coach => coach.id == this.coachId);
        // const results = data[Object.keys(data)[0]];
        state.selectedCoach = state.coaches.find(
            coach => coach.id == this.coachId
        );
    }*/
};
