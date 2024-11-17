export default function ({ store, redirect, route, $auth }) {
  // Path yang tidak memerlukan autentikasi
  const publicPaths = [
    '/authentikasi/login',
    '/authentikasi/register',
    '/admin/login'
  ]

  // Jika berada di path publik, lewati pengecekan
  if (publicPaths.includes(route.path)) {
    return
  }

  // Cek apakah user sudah login
  if (!$auth.loggedIn) {
    return redirect('/authentikasi/login')
  }

  // Cek akses admin
  const isAdmin = $auth.user?.is_admin
  const isAdminRoute = route.path.startsWith('/admin')

  // Jika mencoba mengakses route admin tapi bukan admin
  if (isAdminRoute && !isAdmin) {
    return redirect('/dashboard')
  }

  // Jika admin mencoba mengakses route user
  if (!isAdminRoute && isAdmin) {
    return redirect('/admin/dashboard')
  }
} 