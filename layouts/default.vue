<template>
  <div>
    <!-- Navbar hanya ditampilkan jika pengguna sudah login -->
    <Navbar v-if="$auth.loggedIn" />
    <!-- Render halaman -->
    <Nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'; // Pastikan jalur file Navbar sesuai

export default {
  components: {
    Navbar,
  },
  middleware: 'auth', // Proteksi semua halaman dengan middleware auth
};
</script>
