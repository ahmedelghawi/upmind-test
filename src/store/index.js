import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
    state: {
        customerData: null,
        customerDataAll: null
    },
    getters: {
        customerData: state => {
            return state.customerData;
        },
        customerDataAll: state => {
            return state.customerDataAll;
        }
    },
    mutations: {
        updateCustomerData(state, responseData) {
            state.customerData = responseData.data;
        },
        updateCustomerDataAll(state, responseData) {
            state.customerDataAll = responseData.data;
        }
    },
    actions: {
        loadData ({state}, {page, searchValue, sort, order}) {
            Vue.axios.get('https://5b9a74b8d203ad0014619cbf.mockapi.io/api/mock/clients?page=' + page + '&limit=10&search=' + searchValue + '&sortBy=' + sort + '&order=' + order).then((response) => {
                state.customerData = response.data;
            });
            Vue.axios.get('https://5b9a74b8d203ad0014619cbf.mockapi.io/api/mock/clients?search=' + searchValue).then((response) => {
                state.customerDataAll = response.data;
            });
        }
    }
});
