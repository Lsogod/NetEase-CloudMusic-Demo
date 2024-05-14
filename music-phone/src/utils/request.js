// 网络请求方法
import axios from "axios";
//导入访问云端的基地址
const CLOUD_BASE_URL=process.env.VUE_APP_CLOUD_BASE_URL
const ajax = axios.create({
  //自定义axios对象(ajax就是axios)
  baseURL: CLOUD_BASE_URL, //服务基地址
  timeout: 60000, //超时时间  60s 
});

export default ajax; //相当于导出了一个axios函数
