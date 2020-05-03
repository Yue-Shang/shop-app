import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    // timeout:5000
  })
  //2.axios拦截器
  instance.interceptors.request.use(config =>{
    // console.log(config);
    return config//拦截掉之后还要原封不动的返回出去
  },err =>{} );
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err =>{
    // console.log(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权的防问'
          break
      }
    }
    return err
  });//拦截响应
  //3.发送真正的网络请求
  return instance(config)
}

