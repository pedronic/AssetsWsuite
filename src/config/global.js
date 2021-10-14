import Vue from 'vue'

export const userKey = '__wsuite_user'
//export const baseApiUrl = 'http://localhost:4000'
//export const baseApiUrl = "http://192.168.0.203:3535/v1"
//export const baseApiUrl = "http://172.22.4.34:3535/v1"
export const baseApiUrl = "http://192.168.0.205:3535/v1"

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }