<template>
  <div class="body">
    <div class="min-h-screen container mx-auto px-4 py-8 mt-16 w-8/12">
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
      class="block bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      @click="goToDetail(konsultasi.id)"
          >
        <!-- Header Konsultasi -->
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-4">
            <img
              :src="getUserImage(konsultasi.user.profile_photo)"
              alt="Profile"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h2 class="text-lg font-semibold text-teal-800">{{ konsultasi.user.name }}</h2>
              <p class="text-sm text-gray-500">{{ formatDate(konsultasi.created_at) }}</p>
            </div>
          </div>
          <p class="text-gray-700 font-semibold">{{ konsultasi.judul }}</p>
          <p class="text-gray-600 mt-2">
            Pesan Terakhir: 
            {{ konsultasi.pesans.length ? konsultasi.pesans[konsultasi.pesans.length - 1].isi : 'Belum ada pesan' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Jika Tidak Ada Konsultasi -->
    <p v-else class="text-center text-gray-500 mt-10">Belum ada konsultasi yang dipublikasikan.</p>
  </div>
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
    },
    methods: {
      goToDetail(id) {
        this.$router.push(`/konsultasi/${id}`);
      },
    
    async fetchKonsultasi() {
      try {
        const { data } = await this.$axios.get('/api/konsultasi');
        this.konsultasiList = data.data.data;
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    },
    getUserImage(profilePath) {
      return profilePath
        ? `http://localhost:${this.imagePort}/storage/${profilePath}`
        : require('~/assets/images/anwar.png')
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
  },
};
</script>

<style scoped>

.body {
  background-image: url('~/assets/images/pattern.png'); /* Ganti dengan path pattern Anda */
  background-size: 1000px 1000px; /* Mengatur ukuran pattern menjadi kecil */
  background-repeat: repeat; /* Mengulang pattern */
  background-position: center; /* Pusatkan pattern */
}

</style>
