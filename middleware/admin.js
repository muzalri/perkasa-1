export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn) {
    return redirect('/admin/login')
  }

  if (!$auth.user?.is_admin) {
    return redirect('/dashboard')
  }
} 