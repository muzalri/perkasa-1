export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn) {
    return redirect('/authentikasi/login')
  }
  
  if ($auth.user?.is_admin) {
    return redirect('/admin/dashboard')
  }
} 