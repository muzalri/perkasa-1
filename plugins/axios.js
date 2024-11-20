// plugins/axios.js
export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
      }
      return config
    })
  
    $axios.onError(error => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        redirect('/authentikasi/login')
      }
      return Promise.reject(error)
    })
  }
