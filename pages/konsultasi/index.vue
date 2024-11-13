<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-teal-800">Konsultasi</h1>
      <nuxt-link
        to="/konsultasi/create"
        class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
      >
        Buat Konsultasi Baru
      </nuxt-link>
    </div>

    <!-- Daftar Konsultasi -->
    <div v-if="konsultasiList.length" class="space-y-6">
      <div
        v-for="konsultasi in konsultasiList"
        :key="konsultasi.id"
        class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
        @click="goToDetail(konsultasi.id)"
      >
        <!-- Header Konsultasi -->
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-4">
            <img
              :src="getUserImage(konsultasi.user.profile_picture)"
              alt="Profile"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h2 class="text-lg font-semibold text-teal-800">{{ konsultasi.user.name }}</h2>
              <p class="text-sm text-gray-500">{{ formatDate(konsultasi.created_at) }}</p>
            </div>
          </div>
          <p class="text-gray-700">{{ konsultasi.content }}</p>
        </div>

        <!-- Gambar Konsultasi -->
        <div v-if="konsultasi.image" class="w-full">
          <img
            :src="getImageUrl(konsultasi.image)"
            alt="Gambar Konsultasi"
            class="w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Jika Tidak Ada Konsultasi -->
    <p v-else class="text-center text-gray-500 mt-10">Belum ada konsultasi yang dipublikasikan.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      konsultasiList: [], // Data konsultasi dari API
      imagePort: 8000,
    };
  },
  async created() {
    await this.fetchKonsultasi();
  },
  methods: {
    async fetchKonsultasi() {
      try {
        const { data } = await this.$axios.get('/konsultasi');
        this.konsultasiList = data.data.data;
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
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
    goToDetail(id) {
      this.$router.push(`/konsultasi/${id}`);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 75%;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-teal-800 {
  color: #064e50;
}

.bg-gray-100 {
  background-color: #f7f7f7;
}

.hover\:text-teal-800:hover {
  color: #032b2b;
}
</style>
