import axios from 'axios';

export default function connection(param) {

  const { path, data, method } = param;
  const url = 'http://47.97.125.71:8080' + path;
  let isPost = 'get';
  switch (method) {
    case 1: isPost = 'post';
      break;
    case 2: isPost = 'get';
      break;
    case 3: isPost = 'delete';
      break;
    default:
      break;
  }

  return axios({
    method: isPost,//方法
    url: url,//地址
    data: data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
}