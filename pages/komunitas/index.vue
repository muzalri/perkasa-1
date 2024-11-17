<template>
  <div class="body">
    <div class="container mx-auto px-4 py-8 mt-16 w-8/12">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-teal-800 mb-4 md:mb-0">Komunitas</h1>
        <div class="relative w-full max-w-md mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Cari di komunitas..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
          />
          <svg
            class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16l-4.5 4.5M21 21l-4.5-4.5M10 10a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
        </div>
        <nuxt-link
          to="/komunitas/create"
          class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Buat Artikel Baru
        </nuxt-link>
      </div>

      <!-- Konten Artikel -->
      <div v-if="komunitas.length" class="space-y-6">
        <div
          v-for="komunitasItem in komunitas"
          :key="komunitasItem.id"
          class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
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
      </div>

      <!-- Jika Tidak Ada Artikel -->
      <p v-else class="text-center text-gray-500 mt-10">Belum ada artikel yang dipublikasikan.</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      komunitas: [], // Data komunitas dari API
      imagePort: 8000,
    };
  },
  async created() {
    await this.fetchKomunitas();
  },
  methods: {
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
      return `http://localhost:${this.imagePort}/imagedb/komunitas/${imagePath}`;
    },
    getUserImage(profilePath) {
      return profilePath
        ? `http://localhost:8000/imagedb/profile_photo/${profilePath}`
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
  },
};
</script>
<style scoped>
.body {
  background-image: url('~/assets/images/pattern.png');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  position: absolute;
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
  margin-bottom: 2rem;
}
</style>
