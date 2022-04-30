import {Module} from 'vuex';
import {
    ActionTreeAdaptor,
    GetterTreeAdaptor,
    RootState
} from '@/store/index.types';
import {Actions, Getters, Sample, State} from '@/store/sample/sample.types';

const SET_SAMPLES = 'set_samples';
const SET_SAMPLE = 'set_sample';
const ADD_SAMPLE = 'add_sample';
const UPDATE_SAMPLE = 'update_sample';
const DELETE_SAMPLE = 'delete_sample';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
    samples(state: State) {
        return state.samples;
    },
    sample(state: State) {
        return state.sample;
    }
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
    fetchSamples({commit, dispatch}) {
        return new Promise<{ data: Sample[] }>(resolve => {
            setTimeout(() => {
                resolve({
                    data: [
                        {
                            id: "044f00a8-d337-45c3-b90e-a602016b59c6",
                            name: "Vzorka #323",
                            note: "",
                            amount: 15.0,
                            created_at: "2022-04-13T00:39:40.341Z",
                            user: {
                                id: "123",
                                first_name: "Martin",
                                last_name: "Jahoda",
                                email: "Martin.jahoda@gmail.com",
                            },
                            grant: {
                                id: "123",
                                name: "nbu",
                            }
                        },
                        {
                            id: "177c7a47-bed6-4d6b-9dc4-e773fa358097",
                            name: "Vzorka #233",
                            note: "Martin raz dva tri",
                            amount: 185.0,
                            created_at: "2022-09-06T00:39:40.341Z",
                            user: {
                                id: "123",
                                first_name: "Martin",
                                last_name: "Jahoda",
                                email: "Martin.jahoda@gmail.com",
                            }, grant: {
                                id: "123",
                                name: "nbu",
                            }
                        },

                    ]
                });
            }, 750);
        })
            .then(response => {
                commit(SET_SAMPLES, response.data);
            })
            .catch(e => {
                dispatch(
                    'AppStore/setAlert',
                    {
                        message: e.response?.data?.error
                            ? e.response.data.error
                            : e.message,
                        type: 'error',
                        duration: 0
                    },
                    {root: true}
                );
            });
    },
    fetchSample({commit, dispatch}, id) {
        return new Promise<{ data: Sample }>(resolve => {
            setTimeout(() => {
                resolve({
                    data: {
                        id: id,
                        name: "Vzorka #233",
                        note: "Martin raz dva tri",
                        amount: 185.0,
                        created_at: "2022-09-06T00:39:40.341Z",
                        user: {
                            id: "123",
                            first_name: "Martin",
                            last_name: "Jahoda",
                            email: "Martin.Jahoda@gmail.com",
                        },
                        grant: {
                            id: "123",
                            name: "NBU",
                        }
                    }
                });
            }, 750);
        })
            .then(response => {
                commit(SET_SAMPLE, response.data);
            })
            .catch(e => {
                dispatch(
                    'AppStore/setAlert',
                    {
                        message: e.response?.data?.error
                            ? e.response.data.error
                            : e.message,
                        type: 'error',
                        duration: 0
                    },
                    {root: true}
                );
            });
    },
    saveSample({commit, dispatch}, sample) {
        return new Promise<{ data: Sample }>(resolve => {
            setTimeout(() => {
                resolve({
                    data: {
                        id: Math.random().toString(),
                        name: "Vzorka #233",
                        note: "Martin raz dva tri",
                        amount: 185.0,
                        created_at: "6.9.",
                        user: {
                            id: "123",
                            first_name: "Martin",
                            last_name: "Jahoda",
                            email: "Martin.jahoda@gmail.com",
                        }, grant: {
                            id: "123",
                            name: "nbu",
                        }
                    }
                });
            }, 750);
        })
            .then(response => {
                commit(ADD_SAMPLE, response.data);
            })
            .catch(e => {
                dispatch(
                    'AppStore/setAlert',
                    {
                        message: e.response?.data?.error
                            ? e.response.data.error
                            : e.message,
                        type: 'error',
                        duration: 0
                    },
                    {root: true}
                );
            });
    },
    updateSample({commit, dispatch}, {id, sample}) {
        return new Promise<{ data: Sample }>(resolve => {
            setTimeout(() => {
                resolve({
                    data: {
                        id: id,
                        name: "Vzorka #233",
                        note: "Martin raz dva tri",
                        amount: 185.0,
                        created_at: "123",
                        user: {
                            id: "123",
                            first_name: "Martin",
                            last_name: "Jahoda",
                            email: "Martin.Jahoda@gmail.com",
                        }, grant: {
                            id: "123",
                            name: "nbu",
                        }
                    }
                });
            }, 750);
        })
            .then(response => {
                commit(UPDATE_SAMPLE, {id, sample: response.data});
            })
            .catch(e => {
                dispatch(
                    'AppStore/setAlert',
                    {
                        message: e.response?.data?.error
                            ? e.response.data.error
                            : e.message,
                        type: 'error',
                        duration: 0
                    },
                    {root: true}
                );
            });
    },
    deleteSample({commit, dispatch}, id) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(null);
            }, 750);
        })
            .then(() => {
                commit(DELETE_SAMPLE, id);
            })
            .catch(e => {
                dispatch(
                    'AppStore/setAlert',
                    {
                        message: e.response?.data?.error
                            ? e.response.data.error
                            : e.message,
                        type: 'error',
                        duration: 0
                    },
                    {root: true}
                );
            });
    },
    async resetState({commit}) {
        commit(RESET_STATE);
    }
};

export const store: Module<State, RootState> = {
    namespaced: true,
    state: {
        samples: [],
        sample: null!
    },
    getters,
    mutations: {
        [SET_SAMPLES](state, payload) {
            state.samples = payload;
        },
        [SET_SAMPLE](state, payload) {
            state.sample = payload;
        },
        [ADD_SAMPLE](state, payload) {
            state.samples = [...state.samples, payload];
        },
        [UPDATE_SAMPLE](state, payload) {
            state.samples = state.samples.map(sample =>
                payload.id === sample.id ? payload.sample : sample
            );
        },
        [DELETE_SAMPLE](state, id) {
            state.samples = state.samples.filter(sample => sample.id !== id);
        },
        [RESET_STATE](state) {
            state.samples = [];
        }
    },
    actions
};
