import { mutationTypes } from './types'

export default {
  [mutationTypes.LOGIN_SUCCESS](state, payload) {
    state.userInfo = payload
  },

  [mutationTypes.LOGOUT_SUCCESS](state) {
    state.userInfo = null
  }
}
