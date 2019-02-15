/* eslint-disable */
import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL
})

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

class Services {
  constructor () {
    this.context = null
  }

  init_context (context) {
    this.context = context
  }

  init_request (method, endpoint, payload) {
    return {
      endpoint: endpoint,
      method: method,
      payload: payload
    }
  }

  start_request (request, handle_progress) {
    // make the properly data with method before requesting
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // axios.defaults.headers.post['Cache-Control'] = 'no-cache'
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    // axios.defaults.withCredentials = true
    // axios.defaults.crossDomain = true
    let request_data = this.make_request_data(request.method, request.payload, handle_progress)
    // do request
    return axios[request.method](request.endpoint, ...request_data).then(response => response).catch(error => error.response)
  }

  end_request (response) {
    if (!response) response = {status: 500}
    if (this.context) {
      const status = response.status
      // network error
      if (!status || status >= 500) {
        // TODO: handle network error and server error
        window.location.href = process.env.FRONTEND_URL + '/login'
      }
      // authorization issue
      else if (status === 401 || status === 404) {
        // TODO: handle authorization issue
        // this.context.$store.commit('User/signed_out')
        window.location.href = process.env.FRONTEND_URL + '/login'
      }
    }
    return response
  }

  async do_request (method, url, payload, onUploadProgress) {
    if (!payload || !(payload instanceof Object)) payload = {}

    // init request
    let request = this.init_request(method, url, payload)

    // start request
    const response = await this.start_request(request, onUploadProgress)
    if (process.env.NODE_ENV !== 'production') {
      console.dir(response)
    }

    // end request
    return this.end_request(response, request)
  }

  make_request_data (method, data, handle_progress = null) {
    if (method === 'get' || method === 'delete') {
      return [{
        headers: {...this.get_auth_header(), 'Content-Type': 'application/json'},
        params: data,
        data: {}
      }]
    } else if (method === 'post' || method === 'put' || method === 'patch') {
      const options = {}
      if (typeof handle_progress === 'function') options['onUploadProgress'] = handle_progress
      return [
        data,
        {headers: this.get_auth_header(), ...options}
      ]
    }
  }

  get_auth_header () {
    if (!process.browser) return {}
    if (!this.context) return {}

    return {
      Authorization: this.context.$store.getters['Common/token']
    }
  }
}
// window.call_server_with_axios = Axios
export const services = new Services()

export default {
  install: (Vue, options) => {
    Vue.prototype.$services = services
  }
}
