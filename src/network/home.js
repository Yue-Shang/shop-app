//首页的请求都封装在这里
import {request} from "./request";
//首页第一个请求
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}
