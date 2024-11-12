<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Komunitas</h1>
      <nuxt-link
        to="/komunitas/create"
        class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#064e50] to-[#0A585B] active:scale-95"
      >
        <span
          class="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#0A585B] text-white rounded-[14px] bg-gradient-to-t from-[#064e50] to-[#0A585B]"
        >
          Buat Artikel Baru
        </span>
      </nuxt-link>
    </div>


    <!-- Periksa apakah ada artikel -->
    <div v-if="komunitas.length" class="space-y-6">
      <div 
        v-for="komunitasItem in komunitas" 
        :key="komunitasItem.id" 
        class="bg-white shadow-md rounded p-6"
      >
        <div class="flex items-center space-x-4">
          <img :src="getUserImage(komunitasItem.user.profile_picture)" alt="Profile" class="w-12 h-12 rounded-full" />
          <div>
            <h2 class="font-semibold text-lg">{{ komunitasItem.user.name }}</h2>
            <p class="text-sm text-gray-500">{{ komunitasItem.user.role }}</p>
            <p class="text-sm text-gray-400">{{ formatDate(komunitasItem.created_at) }}</p>
          </div>
        </div>
        <p class="mt-4 text-gray-700">{{ komunitasItem.content }}</p>
        <img 
          v-if="komunitasItem.image" 
          :src="getImageUrl(komunitasItem.image)" 
          alt="Gambar Artikel" 
          class="w-full h-auto rounded my-4" 
        />
        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center space-x-2">
            <button class="text-green-500 flex items-center">
              <i class="fa fa-thumbs-up"></i>
              <span class="ml-1">{{ komunitasItem.likes_count }}</span>
            </button>
            <button class="text-yellow-500 flex items-center">
              <i class="fa fa-comment"></i>
              <span class="ml-1">{{ komunitasItem.comments_count }}</span>
            </button>
          </div>
          <p class="text-sm text-gray-500">{{ komunitasItem.category.name }}</p>
        </div>
      </div>
    </div>

    <!-- Pesan jika tidak ada artikel -->
    <p v-else>Belum ada artikel.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      komunitas: [], // Menampung data komunitas dari API
      imagePort: 8000, // Port backend server
    };
  },
  async created() {
    await this.fetchKomunitas();
  },
  methods: {
    async fetchKomunitas() {
      try {
        const { data } = await this.$axios.get('/komunitas');
        this.komunitas = data.data.data;
      } catch (error) {
        console.error('Gagal mengambil komunitas:', error);
      }
    },
    goToShow(id) {
      this.$router.push(`/komunitas/${id}`);
    },
    getImageUrl(imagePath) {
      return `http://localhost:${this.imagePort}/storage/${imagePath}`;
    },
    getUserImage(profilePath) {
      return profilePath
        ? `http://localhost:${this.imagePort}/storage/${profilePath}`
        : '/default-avatar.png';
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
