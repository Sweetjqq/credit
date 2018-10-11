/**
 * axios数据请求方法封装
 * created by sunhongchao
 * */
import  axios from 'axios'

/**
 * get 请求方式axios封装
 * */
export function Fetch(url,params={}) {
  return new Promise((resolve,reject)=>{
    axios.get(url,{
      params:params
    })
      .then(response=>{
        resolve(response.data);
      })
      .catch(err=>{
        reject(err);
      })
  })

}

/**
 * post 请求方式获取数据
 * */
export function Post(url,data={}) {
  return new Promise((resolve,reject)=>{
    axios.post(url,data)
      .then(response=>{
        resolve(response.data);
      })
      .catch(err=>{
        reject(err);
      })
  })
}

/**
 * delete方式
 * */
export function Delete(url,data={}) {
  return new Promise((resolve,reject)=>{
    axios.delete(url,data)
      .then(response=>{
        resolve(response.data);
      })
      .catch(err=>{
        reject(err);
      })
  })
}
