<template>
  <div class="body">
    <div class="min-h-svh mt-16">
      <div class="container mx-auto px-6 py-8">
        <!-- Tombol Kembali -->
        <nuxt-link 
          to="/komunitas" 
          class="flex items-center text-teal-600 hover:text-teal-800 mb-4"
        >
          <i class="fas fa-arrow-left mr-2"></i> Kembali
        </nuxt-link>

        <div class="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-screen-md">
          <!-- Header dengan foto profil dan nama -->
          <div class="flex items-center mb-6">
            <img
              :src="getUserImage(komunitas.user?.profile_photo)"
              alt="Profile"
              class="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 class="font-semibold text-lg">{{ komunitas.user?.name }}</h2>
              <p class="text-sm text-gray-500">{{ formatDate(komunitas.created_at) }}</p>
              <p class="text-sm text-gray-500">{{ komunitas.category?.name }}</p>
            </div>
            <div v-if="isAuthor" class="ml-auto flex gap-2">
              <button
                @click="destroyKomunitas"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <i class="fas fa-trash mr-2"></i> Hapus
              </button>
            </div>
          </div>

          <!-- Konten artikel -->
          <p class="text-gray-700 text-lg mb-4 article-content">{{ komunitas.body }}</p>

          <!-- Gambar artikel -->
          <img
            v-if="komunitas.image"
            :src="getImageUrl(komunitas.image)"
            alt="Article image"
            class="w-full h-auto rounded-lg mb-6"
          />

          <!-- Like dan Comment counter -->
          <div class="flex items-center space-x-4 mb-4">
            <button 
              @click="toggleLike"
              class="flex items-center space-x-1"
            >
              <i 
                class="fa fa-thumbs-up text-xl"
                :class="userLiked ? 'text-teal-600' : 'text-gray-500'"
              ></i>
              <span class="text-gray-500">{{ totalLikes }}</span>
            </button>
            <div class="flex items-center space-x-1">
              <i class="far fa-comment text-xl text-gray-500"></i>
              <span class="text-gray-500">{{ komunitas.komentars?.length || 0 }}</span>
            </div>
          </div>



          <!-- Komentar -->
          <div class="space-y-4">
            <h3 class="font-semibold text-lg mb-4">Komentar</h3>
            <div v-if="komunitas.komentars && komunitas.komentars.length">
              <div
                v-for="komentar in komunitas.komentars"
                :key="komentar.id"
                class="flex items-start space-x-3 mb-4 bg-gray-50 p-4 rounded-lg"
              >
                <img
                  :src="komentar.user?.profile_photo 
                    ? `https://perkasa.miauwlan.com/imagedb/profile_photo/${komentar.user.profile_photo}`
                    : require('~/assets/images/anwar.png')"
                  alt="Profile"
                  class="w-8 h-8 rounded-full"
                />
                <div class="flex-1 overflow-hidden">
                  <p class="font-semibold text-teal-800">{{ komentar.user?.name }}</p>
                  <div class="comment-content bg-white p-3 rounded-lg mt-1 shadow-sm">
                    <p class="text-gray-700 break-words">{{ komentar.body }}</p>
                  </div>
                  <p class="text-xs text-gray-400 mt-2">{{ formatDate(komentar.created_at) }}</p>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500">Belum ada komentar</p>

            <!-- Form Komentar -->
            <add-komentar 
              :komunitas-id="komunitas.id" 
              @komentar-added="handleNewKomentar"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import AddKomentar from '~/components/AddKomentar.vue'

export default {
  components: {
    AddKomentar
  },
  data() {
    return {
      komunitas: {},
      userLiked: false,
      totalLikes: 0
    };
  },
  async asyncData({ params, $axios }) {
    try {
      const { data } = await $axios.get(`https://perkasa.miauwlan.com/api/komunitas/${params.id}`);
      return { 
        komunitas: data.data,
        totalLikes: data.data.likes ? data.data.likes.length : 0
      };
    } catch (error) {
      console.error('Failed to fetch komunitas data:', error);
      return { 
        komunitas: {},
        totalLikes: 0
      };
    }
  },
  methods: {
    async toggleLike() {
    try {
      const response = await this.$axios.post(
        `https://perkasa.miauwlan.com/api/komunitas/${this.komunitas.id}/like`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${this.$auth.strategy.token.get()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        this.userLiked = response.data.is_liked;
        this.totalLikes = response.data.total_likes;
      }
    } catch (error) {
      console.error('Gagal mengubah status like:', error);
      // Tambahkan notifikasi error jika diperlukan
    }
  },
    
    getImageUrl(imagePath) {
      return imagePath ? `https://perkasa.miauwlan.com/imagedb/komunitas/${imagePath}` : '';
    },
    getUserImage(profilePath) {
      return profilePath 
        ? `https://perkasa.miauwlan.com/imagedb/profile_photo/${profilePath}` 
        : require('~/assets/images/anwar.png');  // Menggunakan require untuk gambar dari assets
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
    handleNewKomentar(newKomentar) {
      // Pastikan komentars adalah array
      if (!this.komunitas.komentars) {
        this.komunitas.komentars = []
      }
      
      // Tambahkan komentar baru ke array
      this.komunitas.komentars.push(newKomentar)
    },
    async destroyKomunitas() {
      if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
        try {
          await this.$axios.delete(`/komunitas/${this.komunitas.id}`, {
            headers: {
              'Authorization': `Bearer ${this.$auth.strategy.token.get()}`,
              'Accept': 'application/json'
            }
          });
          this.$router.push('/komunitas');
        } catch (error) {
          console.error('Error detail:', error.response);
          alert(error.response?.data?.message || 'Gagal menghapus postingan');
        }
      }
    }
  },
  mounted() {
  if (this.komunitas && this.komunitas.likes) {
    const userId = this.$auth?.user?.id;
    this.userLiked = this.komunitas.likes.some(like => 
      like.user_id === userId && like.is_like === true
    );
  }
},
computed: {
  isAuthor() {
    return this.$auth.user && this.komunitas.user && this.$auth.user.id === this.komunitas.user.id;
  }
},
};
</script>

<style scoped>
.text-gray-600 {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
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

.body {
  background-image: url('~/assets/images/pattern.png');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  background-position: center;
  padding: 20px;
}

/* Container untuk konten artikel */
.article-content {
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.comment-content {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
}

.text-gray-700 {
  max-width: 600px;
}
</style>
