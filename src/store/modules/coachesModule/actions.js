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
    }
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

    // PATTERN FOR ASYNC/AWAIT
    // async actionA({ commit }) {
    //     commit('getCoaches', await getData());
    // },
    // async actionB({ dispatch, commit }) {
    //     await dispatch('actionA'); // wait for `actionA` to finish
    //     commit('getCoachDatachData', await getOtherData());
    // }
};
