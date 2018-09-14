import Vue from 'vue'
import {
  apiJson
} from './../base/config'
export default {
  _doGet(url) {
    return Vue.http.get(url)
  },
  _dopost(url, params) {
    params = !params ? {} : params
    return Vue.http.post(url, params)
  },
  getAqi(bounds) {
    var url = apiJson.aqi.replace('{b}', bounds)
    return this._doGet(url)
  }
}