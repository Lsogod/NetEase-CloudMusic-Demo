// 网络请求方法
import axios from "axios";

const ajax = axios.create({
  //自定义axios对象(ajax就是axios)
  baseURL: "http://cloud.tafleo.top", //服务基地址
<<<<<<< HEAD
  //baseURL: 'http://localhost:3000', //服务基地址
=======
  // baseURL: 'http://localhost:3000', //服务基地址
>>>>>>> abc7e501e87cd7847c0a398950eb80ef431fd8e1
});

export default ajax; //相当于导出了一个axios函数
