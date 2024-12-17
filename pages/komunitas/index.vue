<template>
  <div class="body">
    <div class="container mx-auto px-4 py-8 mt-16 w-8/12">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-teal-800 mb-4 md:mb-0">Komunitas</h1>
        <nuxt-link
          to="/komunitas/create"
          class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Buat Artikel Baru
        </nuxt-link>
      </div>

      <!-- Filter Categories -->
      <div class="flex gap-4 mb-8 overflow-x-auto pb-2 whitespace-nowrap categories-container">
        <button 
          @click="selectedCategory = null"
          :class="[
            'px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex-shrink-0 flex items-center justify-center',
            !selectedCategory ? 'bg-teal-600 text-white h-10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 h-10'
          ]"
        >
          ALL
        </button>
        <button 
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex-shrink-0 flex items-center justify-center',
            selectedCategory === category.id ? 'bg-teal-600 text-white h-10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 h-10'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="relative w-full max-w-md mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari di komunitas..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
        />
        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>

      <!-- Konten Artikel dengan Transisi -->
      <transition-group 
        name="artikel-list" 
        tag="div" 
        class="space-y-6"
      >
        <div
          v-for="komunitasItem in filteredKomunitas"
          :key="komunitasItem.id"
          class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-[1.02]"
          @click="goToDetail(komunitasItem.id)"
        >
          <!-- Header Artikel -->
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <img
                :src="getUserImage(komunitasItem.user.profile_photo)"
                alt="Profile"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <h2 class="text-lg font-semibold text-teal-800">{{ komunitasItem.user.name }}</h2>
                <p class="text-sm text-gray-500">{{ formatDate(komunitasItem.created_at) }}</p>
              </div>
            </div>
            <p class="text-gray-700">{{ komunitasItem.body }}</p>
          </div>

          <!-- Gambar Artikel -->
          <div v-if="komunitasItem.image" class="w-full">
            <img
              :src="getImageUrl(komunitasItem.image)"
              alt="Gambar Artikel"
              class="w-full h-64 object-cover"
            />
          </div>

          <!-- Tombol Like dan Komentar -->
          <div class="px-6 py-4 bg-gray-100 flex justify-between items-center">
            <div class="flex items-center space-x-6">
              <button
                class="flex items-center text-teal-600 hover:text-teal-800"
                @click.stop="toggleLike(komunitasItem.id)"
              >
                <i 
                  class="fa fa-thumbs-up mr-1"
                  :class="isLikedByUser(komunitasItem) ? 'text-teal-600' : 'text-gray-500'"
                ></i> 
                {{ komunitasItem.likes ? komunitasItem.likes.length : 0 }}
              </button>
              <div class="flex items-center text-yellow-500">
                <i class="fa fa-comment mr-1"></i> 
                {{ komunitasItem.komentars ? komunitasItem.komentars.length : 0 }}
              </div>
            </div>
            <span class="text-sm text-gray-500">{{ komunitasItem.category.name }}</span>
          </div>
        </div>
      </transition-group>

      <!-- Jika Tidak Ada Artikel -->
      <p v-if="filteredKomunitas.length === 0" class="text-center text-gray-500 mt-10">
        Tidak ada artikel yang sesuai dengan filter.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      komunitas: [],
      categories: [],
      selectedCategory: null,
      searchQuery: ''
    }
  },
  async created() {
    await Promise.all([
      this.fetchKomunitas(),
      this.fetchCategories()
    ])
  },
  computed: {
    filteredKomunitas() {
      return this.komunitas.filter(item => {
        const matchesCategory = !this.selectedCategory || item.category.id === this.selectedCategory
        const matchesSearch = !this.searchQuery || 
          item.body.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await this.$axios.get('/komunitas/categories')
        this.categories = data.data
      } catch (error) {
        console.error('Gagal mengambil kategori:', error)
      }
    },
    async fetchKomunitas() {
      try {
        const { data } = await this.$axios.get('/komunitas');
        this.komunitas = data.data.data || [];
      } catch (error) {
        console.error('Gagal mengambil komunitas:', error);
        this.komunitas = [];
      }
    },
    getImageUrl(imagePath) {
      return `https://perkasa.miauwlan.com/imagedb/komunitas/${imagePath}`;
    },
    getUserImage(profilePath) {
      return profilePath
        ? `https://perkasa.miauwlan.com/imagedb/profile_photo/${profilePath}`
        : require('~/assets/images/anwar.png'); 
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
    goToDetail(id) {
      this.$router.push(`/komunitas/${id}`);
    },
    async toggleLike(komunitasId) {
      try {
        const response = await this.$axios.post(`/komunitas/${komunitasId}/like`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        });

        // Perbarui status like berdasarkan response
        if (response.data.success) {
          const index = this.komunitas.findIndex(item => item.id === komunitasId);
          if (index !== -1) {
            const userId = this.$auth.user.id;
            const isCurrentlyLiked = this.isLikedByUser(this.komunitas[index]);

            if (isCurrentlyLiked) {
              // Hapus like jika sudah dilike
              this.komunitas[index].likes = this.komunitas[index].likes.filter(
                like => like.user_id !== userId
              );
            } else {
              // Tambah like jika belum dilike
              if (!this.komunitas[index].likes) {
                this.komunitas[index].likes = [];
              }
              this.komunitas[index].likes.push({ user_id: userId });
            }
          }
        }
      } catch (error) {
        console.error('Gagal mengupdate like:', error);
      }
    },

    isLikedByUser(komunitasItem) {
      if (!komunitasItem.likes || !this.$auth.user) return false;
      return komunitasItem.likes.some(like => like.user_id === this.$auth.user.id);
    },
  }
}
</script>

<style scoped>
/* Animasi untuk artikel list */
.artikel-list-enter-active,
.artikel-list-leave-active {
  transition: all 0.5s ease;
}
.artikel-list-enter-from,
.artikel-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.artikel-list-move {
  transition: transform 0.5s ease;
}

.body {
  background-image: url('~/assets/images/pattern.png');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow-y: auto;
}

.container {
  position: relative;
  z-index: 1;
  padding-top: 100px;
  margin-bottom: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.text-gray-700 {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.bg-white {
  max-width: 800px;
  margin: 0 auto;
}

.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #0A585B #f3f4f6;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #0A585B;
  border-radius: 3px;
}

.categories-container {
  height: 40px;
  align-items: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 1rem;
}

.categories-container::-webkit-scrollbar {
  display: none;
}

.categories-container button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
}
</style>

