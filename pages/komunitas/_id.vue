<template>
    <div class="body">
      <div class="min-h-svh mt-16">
        <div class="container mx-auto px-6 py-8">
          <div class="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-screen-md">
            <div class="mb-6">
              <h1 class="text-3xl font-bold text-teal-800">{{ komunitas.title }}</h1>
              <div class="flex items-center mt-4 text-gray-500">
                <img
                  :src="getUserImage(komunitas.user?.profile_photo)"
                  alt="Author's profile picture"
                  class="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p class="font-semibold">{{ komunitas.user?.name }}</p>
                  <p class="text-sm">
                    {{ formatDate(komunitas.created_at) }} • {{ komunitas.category?.name }}
                  </p>
                </div>
              </div>
            </div>
  
          
              <img
                :src="getImageUrl(komunitas.image)"
                alt="Article image"
                class="w-full h-auto rounded-lg"
              />
            
  
            <div v-if="komunitas.body" class="mb-6">
              <p class="text-gray-700 text-lg leading-relaxed">{{ komunitas.body }}</p>
            </div>
  
            <div class="flex items-center space-x-4 mb-6">
              <button
                @click="toggleLike"
                :class="userLiked ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'"
                class="flex items-center px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition"
              >
                <i class="fa fa-thumbs-up mr-2"></i> Suka ({{ komunitas.likes_count }})
              </button>
              <button
                class="flex items-center px-4 py-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 transition"
              >
                <i class="fa fa-comment mr-2"></i> Komentar ({{ komunitas.komentars?.length || 0 }})
              </button>
            </div>
  
            <div>
              <h2 class="text-2xl font-semibold text-teal-800 mb-4">Komentar</h2>
              <div v-if="komunitas.komentars && komunitas.komentars.length">
                <div
                  v-for="komentar in komunitas.komentars"
                  :key="komentar.id"
                  class="border-b py-4"
                >
                  <div class="flex items-center text-gray-500">
                    <img
                      :src="getUserImage(komentar.user?.profile_photo)"
                      alt="Commenter's profile picture"
                      class="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p class="font-semibold">{{ komentar.user?.name }}</p>
                      <p class="text-sm">{{ formatDate(komentar.created_at) }}</p>
                    </div>
                  </div>
                  <p class="mt-2 text-gray-700">{{ komentar.body }}</p>
                </div>
              </div>
              <div v-else>
                <p class="text-gray-500">Belum ada komentar. Jadilah yang pertama!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      komunitas: {}, // Data komunitas dari API
      userLiked: false,
    };
  },
  async asyncData({ params, $axios }) {
    try {
      const { data } = await $axios.get(`http://localhost:8000/api/komunitas/${params.id}`);
      return { 
        komunitas: data.data // Langsung akses data.data karena response sudah benar
      };
    } catch (error) {
      console.error('Failed to fetch komunitas data:', error);
      return { komunitas: {} };
    }
  },
  methods: {
    async toggleLike() {
      try {
        const response = await this.$axios.post(
          `/komunitas/${this.komunitas.id}/like`,
          { is_like: !this.userLiked },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        this.userLiked = response.data.is_like;
        this.komunitas.likes_count = response.data.data.likes_count;
      } catch (error) {
        console.error('Gagal mengubah status like:', error);
      }
    },
    
    getImageUrl(imagePath) {
      return imagePath ? `http://localhost:8000/storage/${imagePath}` : '';
    },
    getUserImage(profilePath) {
      return profilePath 
        ? `http://localhost:8000/storage/${profilePath}` 
        : require('~/assets/images/anwar.png');  // Menggunakan require untuk gambar dari assets
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
  },
  mounted() {
    if (this.komunitas && this.komunitas.likes) {
      this.userLiked = this.komunitas.likes.some(
        (like) => like.user_id === this.$auth?.user?.id
      );
    }
  },
};
</script>

<style>
.body {
  background-image: url('~/assets/images/pattern.png'); /* Ganti dengan path pattern Anda */
  background-size: 1000px 1000px; /* Mengatur ukuran pattern menjadi kecil */
  background-repeat: repeat; /* Mengulang pattern */
  background-position: center; /* Pusatkan pattern */
}
</style>