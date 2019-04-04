import axios from 'axios'

const HOST = 'http://10.10.87.21:8081'
export const userLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${HOST}/user/login`, {
      username,
      password
    }).then(res => {
      if(res.status_code === 20000) {
        resolve({...res.data, status_msg: '登录成功'})
      } else {
        reject({status_msg: '登录失败'})
      }
    }).catch(() => {
      reject({status_msg: '登录失败'})
    })
  })
}