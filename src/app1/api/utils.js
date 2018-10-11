import { Message } from 'element-ui'

/**
 * Utility function for processing the response of http call using axios.
 * @param {*} response Response object
 * @return Promise
 */
export const processResponse = response => {
  return response
    .then(res => {
      return {
        ...res.data
      }
    })
    .catch(err => {
      Message.error(err.response.data.error.message)
      return {
        ...err.response.data
      }
    })
}


