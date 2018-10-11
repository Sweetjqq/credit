import api from '../../api/auth'
import { actionTypes, mutationTypes } from './types'

export default {
  /**
   * 登录
   * @param {any} {commit}
   * @param {any} {userName, password, verifyCode}
   * @returns
   */
  [actionTypes.LOGIN]({ commit }, { userName, password, verifyCode }) {
    return api
      .login(userName, password, verifyCode)
      .then(({ success, message, data }) => {
        if (success) {
          commit(mutationTypes.LOGIN_SUCCESS, data)
        }
        return { success, message }
      })
  },

  /**
   * 判断用户是否已登录
   * @returns
   */
  [actionTypes.IS_LOGIN]({ commit, state }) {
    return !!state.userInfo.userName
    // return api.isLogin().then(({ success, data }) => {
    //   if (success) {
    //     commit(mutationTypes.LOGIN_SUCCESS, data)
    //   }
    //   return !!data
    // })
  },

  /**
   * 退出登录
   */
  [actionTypes.LOGOUT]({ commit }) {
    return api.logout().then(data => {
      if (data) {
        commit(mutationTypes.LOGOUT_SUCCESS)
        return true
      }
      return false
    })
  }
}
