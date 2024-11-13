<template>
  <div class="body">
    <div class="min-h-screen container mx-auto px-4 py-8 mt-16 w-8/12">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-teal-800">Panduan</h1>
        <div class="flex items-center space-x-4">
          <div class="relative w-full max-w-md mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search here"
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
            v-if="$auth.user && $auth.user.role === 'pakar'"
            to="/panduan/create"
            class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Buat Panduan
          </nuxt-link>
        </div>
      </div>

      <!-- Grid Panduan -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="guide in guideBooks" 
          :key="guide.id" 
          class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          @click="goToDetail(guide.id)"
        >
          <NuxtLink :to="`/panduan/${guide.id}`">
            <!-- Gambar Panduan -->
            <img 
              v-if="guide.image_path" 
              :src="`http://localhost:8000/storage/${guide.image_path}`"
              class="w-full h-48 object-cover"
              alt="Panduan Image"
            />
            
            <!-- Konten Panduan -->
            <div class="p-6">
              <h2 class="text-xl font-bold mb-2">{{ guide.title }}</h2>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ guide.content }}</p>
              
              <!-- Footer dengan info penulis -->
              <div class="flex items-center space-x-4">
                <img
                  :src="getUserImage(guide.user?.profile_photo)"
                  alt="Author"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <p class="font-semibold">{{ guide.user?.name || 'Penulis' }}</p>
                  <p class="text-sm text-gray-500">{{ formatDate(guide.created_at) }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guideBooks: [],
      imagePort: 8000
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.get('/guide-books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        this.guideBooks = response.data.data.data;
      }
    } catch (error) {
      console.error('Error fetching guide books:', error);
    }
  },
  methods: {
    getUserImage(profilePath) {
      return profilePath
        ? `http://localhost:${this.imagePort}/storage/${profilePath}`
        : require('~/assets/images/anwar.png');
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
    goToDetail(id) {
      this.$router.push(`/panduan/${id}`);
    }
  }
}
</script>

<style scoped>
.body {
  background-image: url('~/assets/images/pattern.png');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  background-position: center;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
  