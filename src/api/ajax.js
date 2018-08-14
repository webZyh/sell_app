/*
*   ajax模块
* */
import axios from 'axios'

export default function ajax(type = 'GET', url, data = {},) {
  return new Promise((resolve, reject) => {
    let res;
    if (type === "GET") {
      let dataStr = '';
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      res = axios.get(url);
    }else{
      res = axios.post(url,data)
    }

    res.then((response)=>{
      resolve(response.data)
    }).catch((error)=>{
      reject(error)
    })
  })
}