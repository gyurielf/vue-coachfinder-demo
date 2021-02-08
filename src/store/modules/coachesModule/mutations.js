export default {
    // My old way of getting/fetching coaches vie http request,
    /*getCoaches(state, payload) {
        state.coaches = payload[Object.keys(payload)[0]];
        // console.log(state.coaches);
    },*/
    setCoaches(state, payload) {
        state.coaches = payload;
    },

    // Temporary disabled
    /*async getCoachData(state) {
        try {
            const response = await fetch(
                'https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
            );
            await response.json().then(data => {
                const results = data[Object.keys(data)[0]];
                state.selectedCoach = results.find(
                    coach => coach.id == this.coachId
                );
            });
        } catch (e) {
            const error = e.toString();
            console.log(error);
        }
    },*/

    // not need atm(or never)
    /*getCoachData(state, payload) {
        // const results = payload[Object.keys(payload)[0]];
        // state.selectedCoach = results.find(coach => coach.id == this.coachId);
        // const results = data[Object.keys(data)[0]];
        state.selectedCoach = state.coaches.find(
            coach => coach.id == this.coachId
        );
    }*/

    /* ### POSTING DATA ### */
    registerCoach(state, payload) {
        // This step is done in the actions.
        /*let newCoach = {
            firstName: payload.firstName.val,
            lastName: payload.lastName.val,
            type: payload.type.val,
            desc: payload.desc.val,
            rate: payload.rate.val
        };
        newCoach.id = Math.floor(Math.random() * 999) + 1000;*/

        state.coaches.push(payload);
    }
};
