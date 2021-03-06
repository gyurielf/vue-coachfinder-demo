export default {
    // addRequest({ commit }, payload) {
    //     commit('addRequest', payload);
    // },
    async addRequest({ commit }, payload) {
        // const requestId = Math.floor(Math.random() * 1000) + 9000;
        const response = await fetch(
            `https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/requests.json`,
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            console.log('ERR');
        }

        console.log(await responseData.name);

        commit('addRequest', {
            ...payload,
            id: await responseData.name
        });
    },
    async loadRequests({ commit, rootGetters }) {
        const token = rootGetters['authModule/token'];

        const response = await fetch(
            `https://vue-http-b1792-default-rtdb.europe-west1.firebasedatabase.app/requests.json?auth=${token}`
        );

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch!');
        }

        const requests = [];
        for (const key in responseData) {
            const request = {
                id: key,
                coachId: responseData[key].coachId,
                email: responseData[key].email,
                message: responseData[key].message,
                subject: responseData[key].subject
            };
            requests.push(request);
        }
        commit('setRequests', requests);
    }
};
