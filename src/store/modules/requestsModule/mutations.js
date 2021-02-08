export default {
    addRequest(state, payload) {
        const newRequest = {
            ...payload,
            id: Math.floor(Math.random() * 1000) + 9000
        };
        state.requests.push(newRequest);
    }
};
