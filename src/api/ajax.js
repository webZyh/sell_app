/*
*   ajax模块
* */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let res;
    if (type === "GET") {
      let dataStr = '';
      Object.keys(data).forEach((key) => {
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
      //console.log(response.data);
      resolve(response.data)
    }).catch((error)=>{
      reject(error)
    })
  })
}

/*
demo
<script>
    var obj = {a:'1',b:'3'};
    var url = 'www.baidu.com'
    let dataStr = ''
    console.log(Object.keys(obj));
    Object.keys(obj).forEach((key)=>{
        console.log(key)
        dataStr += key + '=' + obj[key] + '&'
        console.log(dataStr)
    });
    var str = 'a=1&b=3&'
    console.log(str.lastIndexOf('&'));
    if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
    }
    console.log(url);
</script>
*/
