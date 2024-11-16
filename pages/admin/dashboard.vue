<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard Admin</h1>
        
        <!-- Menu Manajemen -->
        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Manajemen User -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <i class="fas fa-users text-teal-600 text-2xl"></i>
                </div>
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">Manajemen User</h3>
                  <p class="mt-1 text-sm text-gray-500">Kelola data pengguna aplikasi</p>
                </div>
              </div>
              <div class="mt-4">
                <nuxt-link 
                  to="/admin/users"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200"
                >
                  Kelola User
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- Manajemen Konten -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <i class="fas fa-file-alt text-teal-600 text-2xl"></i>
                </div>
                <div class="ml-5">
                  <h3 class="text-lg font-medium text-gray-900">Manajemen Konten</h3>
                  <p class="mt-1 text-sm text-gray-500">Kelola konten aplikasi</p>
                </div>
              </div>
              <div class="mt-4">
                <nuxt-link 
                  to="/admin/content"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200"
                >
                  Kelola Konten
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      stats: {}
    }
  },
  async created() {
    await this.fetchStats()
  },
  methods: {
    async fetchStats() {
      try {
        const response = await this.$axios.get('/admin/stats')
        this.stats = response.data.data
      } catch (error) {
        console.error('Gagal mengambil statistik:', error)
      }
    }
  }
}
</script> 