// 用来做 axios 请求的文件
import aixos from 'axios'
const instance =axios.create({
    baseURL:'localhsot://3000',
    timeout:5000
})
export function  get(url,params){
    return aixos.get(url,{
        params
    })
}

export function post(url,data) {
    return aixos.post(url,data)
}

export function put(url,data){
    return aixos.put(url,data)
}

export function del(url){
    return aixos.delete(url)
}



 