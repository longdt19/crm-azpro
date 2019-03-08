/* eslint-disable */

const INIT_STATE = {
  bank_list: [],
  transaction_category_list: [],
  customer_list: [],
  token: null,
  constants_loaded: null,
  username: null,
  navigation: {},
  search_bank: {},
  search_product: {},
  search_customer: {},
  search_transaction: {},
  complaint_id: null
}

export default {
  namespaced: true,
  state: {
    ...INIT_STATE
  },
  mutations: {
    bankList_loaded: (state, value) => {
      state.bank_list = value
    },
    transactionCategoryList_loaded: (state, value) => {
      state.transaction_category_list = value
    },
    customerList_loaded: (state, value) => {
      state.customer_list = value
    },
    tokenLoaded: (state, value) => {
      state.token = value
    },
    constants_loaded: (state, value) => {
      state.constants_loaded = value
    },
    username: (state, value) => {
      state.username = value
    },
    navigation: (state, value) => {
      state.navigation = value
    },
    restore_navigation: (state) => {
      state.navigation = {}
    },
    search_bank_loaded: (state, value) => {
      state.search_bank = value
    },
    search_product_loaded: (state, value) => {
      state.search_product = value
    },
    search_customer_loaded: (state, value) => {
      state.search_customer = value
    },
    search_transaction_loaded: (state, value) => {
      state.search_transaction = value
    },
    complaint_id_loaded: (state, value) => {
      state.complaint_id = value
    },
    restore: (state) => {
      const s = INIT_STATE
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },
  actions: {},
  getters: {
    common_data: state => state,
    token: state => state.token,
    bank_list: state => state.bank_list,
    transaction_category_list: state => state.transaction_category_list,
    customer_list: state => state.customer_list,
    constants_loaded: state => state.constants_loaded,
    username: state => state.username,
    navigation: state => state.navigation,
    search_bank: state => state.search_bank,
    search_product: state => state.search_product,
    search_customer: state => state.search_customer,
    search_transaction: state => state.search_transaction,
    complaint_id: state => state.complaint_id
  }
}
