export default {
    // OLD way of getCoaches
    // getCoaches(context) {
    //     context.commit('getCoaches');
    // },
    // NEW way of getCoaches
    async getCoaches({ commit }) {
        try {
            const response = await fetch(
                'https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
            );
            commit(
                'getCoaches',
                await response.json().then(data => {
                    // return data[Object.keys(data)[0]];
                    return data;
                })
            );
        } catch (e) {
            const error = e.toString();
            console.log(error);
        }
    },
    // OLD way of getCoachData
    // getCoachData(context) {
    //     context.commit('getCoachData');
    // }
    // New way of getCoachData
    /*async getCoachData({ commit }) {
        try {
            // Wait for the all coaches data
            await this.dispatch('getCoaches');
            commit('getCoachData');
        } catch (e) {
            const error = e.toString();
            console.log(error);
        }
    }*/

    /* ### POSTING DATA ### */
    // Async try
    // async registerCoach({commit}) {
    //     commit('registerCoach', await payload)
    // }

    // Registering Coach
    async registerCoach(context, payload) {
        const userId = context.rootGetters.userId;
        console.log(userId);
        const coachData = {
            firstName: payload.firstName.val,
            lastName: payload.lastName.val,
            type: payload.type.val,
            desc: payload.desc.val,
            rate: payload.rate.val
        };
        const response = await fetch(
            `https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(coachData)
            }
        );
        // const responseData = await response.json();
        if (!response.ok) {
            console.log('ERR');
        }
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        try {
            const response = await fetch(
                `https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
            );
            const responseData = await response.json();
            if (!response.ok) {
                console.log('ERR');
            }

            const coaches = [];
            for (const key in responseData) {
                const coach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    type: responseData[key].type,
                    desc: responseData[key].desc,
                    rate: responseData[key].rate
                };
                coaches.push(coach);
            }
            context.commit('setCoaches', coaches);
        } catch (e) {
            const error = e.toString();
            console.log(error);
        }
    }
    // MY OWN LOGIC OF GETTING COACHES
    /*async loadCoaches({ commit }) {
        try {
            const response = await fetch(
                `https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
            );
            commit(
                'getCoaches',
                await response.json().then(data => {
                    return data;
                })
            );
            if (!response.ok) {
                console.log('ERR');
            }
        } catch (e) {
            const error = e.toString();
            console.log(error);
        }
    }*/

    // PATTERN FOR ASYNC/AWAIT
    // async actionA({ commit }) {
    //     commit('getCoaches', await getData());
    // },
    // async actionB({ dispatch, commit }) {
    //     await dispatch('actionA'); // wait for `actionA` to finish
    //     commit('getCoachDatachData', await getOtherData());
    // }
};
