// import axios from './axios'
// import { processResponse } from './utils'

console.log(`API_GATEWAY: ${process.env.API_GATEWAY}`)

export default {
  /**
   * 登录
   * @param {any} loginName - 登录名
   * @param {any} password - 密码
   * @param {any} verifyCode - 验证码
   * @returns
   */
  login(username, password) {

    return Promise.resolve({
      success: true,
      data: { userName: '琼哥', telephone: '12345678901' }
    })
    // return processResponse(
    //   axios.post('users/login-via-cellphone', {
    //     cellphone: username,
    //     password
    //   })
    // )
  },

  /**
   * 退出登录
   * @returns
   */
  logout() {
    return Promise.resolve(true)
    // return processResponse(axios.post('users/logout'))
  },

  /**
   * 检查是否已登录
   * @returns
   */
  isLogin() {
    return Promise.resolve(true)
  },

  fetchCurrentUser() {
    return Promise.resolve({ userName: '琼哥', telephone: '12345678901' })
  }
}
