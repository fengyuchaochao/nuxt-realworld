const cookieparser = process.server ? require('cookieparser') : '';

export const state = () => {
    return {
        user: null
    };
};

export const mutations = {
    setUser (state, payload) {
        state.user = payload;
    }
};

export const actions = {
    nuxtServerInit ({commit}, {req}) {
        let user = null;
        if (req.headers.cookie) {
            let parsed = cookieparser.parse(req.headers.cookie);
            try {
                user = JSON.parse(parsed.user);
            } catch (e) {

            }
        }
        commit('setUser', user);
    }
};

