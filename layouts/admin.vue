<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside v-if="$route.path !== '/admin/login'" class="w-64 bg-teal-800 text-white">
      <div class="p-4">
        <h1 class="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav class="mt-4">
        <nuxt-link 
          to="/admin/categories"
          class="block px-4 py-2 hover:bg-teal-700"
        >
          Kategori
        </nuxt-link>
        <nuxt-link 
          to="/admin/guide-books"
          class="block px-4 py-2 hover:bg-teal-700"
        >
          Panduan
        </nuxt-link>
        <nuxt-link 
          to="/admin/adminkomunitas"
          class="block px-4 py-2 hover:bg-teal-700"
        >
          Komunitas
        </nuxt-link>
        <button 
          @click="logout"
          class="block w-full text-left px-4 py-2 hover:bg-teal-700"
        >
          Logout
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      if (process.client) {
        localStorage.removeItem('admin_token')
        this.$router.push('/admin/login')
      }
    }
  }
}
</script> 