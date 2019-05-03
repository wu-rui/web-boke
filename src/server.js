import axios from 'axios';

export default function connection(param) {

  const { path, data, method } = param;
  const url = 'http://47.97.125.71:8080' + path;
  const isPost = (method === 1 ? 'post' : 'get');

  return axios({
    method: isPost,//方法
    url: url,//地址
    data: data,
  })
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    })
}