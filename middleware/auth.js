export default function ({ $auth, redirect, route }) {
  // Daftar path yang membutuhkan autentikasi
  const protectedPaths = [
    '/komunitas',
    '/panduan',
    '/konsultasi',
    '/profile'
  ]

  // Cek apakah path saat ini termasuk dalam protected paths
  const isProtectedPath = protectedPaths.some(path => 
    route.path.startsWith(path)
  )

  if (isProtectedPath) {
    // Jika user belum login, redirect ke halaman login
    if (!$auth.loggedIn) {
      return redirect('/authentikasi/login')
    }

    // Cek token
    const token = localStorage.getItem('token')
    if (!token) {
      return redirect('/authentikasi/login')
    }
  }
}
