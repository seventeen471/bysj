import axios from 'axios'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // router.replace({
          //   path: 'login',
          //   query: {redirect: router.currentRoute.fullPath}
          // })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });
