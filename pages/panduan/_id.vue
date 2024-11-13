<template>
  <div class="body">
    <div class="min-h-screen container mx-auto px-4 py-8 mt-16 w-8/12">
      <!-- Header dengan tombol kembali -->
      <div class="flex items-center space-x-4 mb-6">
        <NuxtLink 
          to="/panduan" 
          class="text-teal-800 hover:text-teal-600"
        >
          <i class="fas fa-arrow-left"></i> Kembali
        </NuxtLink>
      </div>

      <!-- Konten Panduan -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Gambar Panduan -->
        <img 
          v-if="guideBook.image_path" 
          :src="`http://localhost:8000/storage/${guideBook.image_path}`"
          class="w-full h-64 object-cover"
          alt="Panduan Image"
        />

        <!-- Konten -->
        <div class="p-6">
          <h1 class="text-3xl font-bold text-teal-800 mb-4">{{ guideBook.title }}</h1>
          
          <!-- Info Penulis -->
          <div class="flex items-center space-x-4 mb-6">
            <img
              :src="getUserImage(guideBook.user?.profile_photo)"
              alt="Author"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <p class="font-semibold">{{ guideBook.user?.name || 'Penulis' }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(guideBook.created_at) }}</p>
            </div>
          </div>

          <!-- Isi Konten -->
          <div class="prose max-w-none">
            <p class="text-gray-700 whitespace-pre-wrap">{{ guideBook.content }}</p>
          </div>

          <!-- Video jika ada -->
          <div v-if="guideBook.video_path" class="mt-6">
            <video 
              :src="`http://localhost:8000/storage/${guideBook.video_path}`"
              controls
              class="w-full rounded-lg"
            ></video>
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
      guideBook: {},
      imagePort: 8000
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`/guide-books/${this.$route.params.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        this.guideBook = response.data.data;
      }
    } catch (error) {
      console.error('Error fetching guide book:', error);
    }
  },
  methods: {
    getUserImage(profilePath) {
      return profilePath
        ? `http://localhost:${this.imagePort}/storage/${profilePath}`
        : require('~/assets/images/anwar.png');
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
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
</style>
