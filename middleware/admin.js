export default function ({ redirect }) {
  if (process.client) {
    const adminToken = localStorage.getItem('admin_token')
    if (!adminToken) {
      return redirect('/admin/login')
    }
  }
} 