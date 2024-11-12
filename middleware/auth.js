export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn) {
    return redirect('/authentikasi/login');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login'); // Redirect ke halaman login jika tidak ada token
  }
}
