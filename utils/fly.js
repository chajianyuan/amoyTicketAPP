var Fly = require('flyio/dist/npm/wx');
var fly = new Fly();
fly.config.baseURL='http://192.168.43.28:7001' //本地热点
//添加请求拦截器
fly.interceptors.request.use(request => {
  //给所有请求添加自定义header
  // console.log('resquest',JSON.stringify(request))
  const token = uni.getStorageSync('token');
  if (token) {
    request.headers['Authorization'] = token;
  }

  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理0之前执行
fly.interceptors.response.use(
  response => {
    //只将请求结果的data字段返回
    return response.data;
  },
  err => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss") 
  }
);

export default fly;
