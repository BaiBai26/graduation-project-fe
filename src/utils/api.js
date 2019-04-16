import axios from 'axios'

const HOST = 'http://10.10.87.26:8081'
const fetch = (url, params, method, headers) => {
  const axiosParams = {
    url,
    method,
  }
  if( headers ) {
    axiosParams.headers = headers
  }
  if(method === 'get' || !method) {
    axiosParams.params = params
  } else {
    axiosParams.data = params
  }
  return new Promise((resolve, reject) => {
    axios(axiosParams).then(res => {
      if(res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(() => {
      reject({status_msg: '未知错误！请重试'})
    })
  })
}
export const userLogin = (username, password) => {
  const url = `${HOST}/user/login`;
  return fetch(url, {username, password}, 'post');
}

export const getNetMonitor = () => {
  const url = `${HOST}/vm/netmonitor`;
  return fetch(url, {}, 'get');
}
// 获取非法虚拟机信息
export const getVMMonitor = (token) => {
  const url = `${HOST}/vm/monitor`;
  return fetch(url, {}, 'get', {token});
}
// 获取集群数量
export const getVMNums = (token) => {
  const url =  `${HOST}/vm/nums`;
  return fetch(url, {}, 'get', {token});
}
// 删除非法虚拟机
export const deleteVM = (node, uuid, token) => {
  const url =  `${HOST}/vm/delete`;
  return fetch(url, {node, uuid}, 'get', {token});
}