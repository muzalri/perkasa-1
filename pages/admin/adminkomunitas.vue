<template>
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Manajemen Artikel Komunitas</h1>
        
        <!-- Daftar Artikel -->
        <div class="mt-6 space-y-4">
          <div v-for="artikel in artikelList" :key="artikel.id" 
            class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <!-- Header dengan info user -->
                <div class="flex items-center space-x-4 mb-4">
                  <img 
                    :src="getUserImage(artikel.user?.profile_photo)"
                    class="w-12 h-12 rounded-full"
                    alt="User profile"
                  />
                  <div>
                    <h3 class="font-semibold">{{ artikel.user?.name }}</h3>
                    <p class="text-sm text-gray-500">{{ formatDate(artikel.created_at) }}</p>
                  </div>
                </div>
                
                <!-- Judul dan Konten -->
                <h2 class="text-xl font-bold mb-2">{{ artikel.title }}</h2>
                <p class="text-gray-600 mb-2">{{ artikel.body }}</p>
                
                <!-- Info tambahan -->
                <div class="text-sm text-gray-500">
                  <span class="bg-teal-100 text-teal-800 px-2 py-1 rounded">
                    {{ artikel.category?.name }}
                  </span>
                </div>
              </div>
              
              <button 
                @click="deleteArtikel(artikel.id)"
                class="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
  
          <!-- Pesan jika tidak ada artikel -->
          <div v-if="artikelList.length === 0" class="text-center text-gray-500 py-8">
            Tidak ada artikel yang tersedia
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'admin-auth',
    data() {
      return {
        artikelList: [],
        imagePort: 8000
      }
    },
    async created() {
      await this.fetchArtikel()
    },
    methods: {
      async fetchArtikel() {
        try {
          if (process.client) {
            const adminToken = localStorage.getItem('admin_token')
            if (!adminToken) {
              this.$router.push('/admin/login')
              return
            }
            
            const response = await this.$axios.get('/admin/articles', {
              headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Accept': 'application/json'
              }
            })
            this.artikelList = response.data.data.data
          }
        } catch (error) {
          console.error('Gagal mengambil artikel:', error)
          if (error.response?.status === 401) {
            localStorage.removeItem('admin_token')
            this.$router.push('/admin/login')
          }
        }
      },
      getUserImage(profilePath) {
        return profilePath
          ? `http://localhost:${this.imagePort}/storage/${profilePath}`
          : require('~/assets/images/anwar.png')
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      async deleteArtikel(id) {
        if (confirm('Yakin ingin menghapus artikel ini?')) {
          try {
            const adminToken = localStorage.getItem('admin_token')
            await this.$axios.delete(`/admin/articles/${id}`, {
              headers: {
                'Authorization': `Bearer ${adminToken}`
              }
            })
            await this.fetchArtikel()
            alert('Artikel berhasil dihapus')
          } catch (error) {
            console.error('Gagal menghapus artikel:', error)
            alert('Gagal menghapus artikel')
          }
        }
      }
    }
  }
  </script>