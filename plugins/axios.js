export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (process.client) {
      const adminToken = localStorage.getItem('admin_token')
      const isAdminRoute = config.url.includes('/admin')
      
      if (isAdminRoute && adminToken) {
        config.headers.common['Authorization'] = `Bearer ${adminToken}`
      }
    }
    return config
  })

  $axios.onError(error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      redirect('/authentikasi/login')
    }
    return Promise.reject(error)
  })
}
