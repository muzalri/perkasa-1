<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="mt-20 text-3xl font-bold text-dark-green mb-4">Konsultasi</h1>
    
    <nuxt-link to="/konsultasi/create" class="bg-blue-500 text-white py-2 px-4 rounded mb-4">Buat Artikel Baru</nuxt-link>

    <!-- <div v-if="konsultasi" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="konsultasiItem in konsultasi" 
        :key="konsultasiItem.id" 
        class="bg-white shadow-md rounded p-4 cursor-pointer" 
        @click="goToShow(konsultasiItem.id)"
      >
        <h2 class="text-lg font-semibold">{{ konsultasiItem.title }}</h2>
        <p class="text-gray-600">Penulis: {{ konsultasiItem.user.name }}</p>
        <p class="text-gray-600">Kategori: {{ konsultasiItem.category.name }}</p>
        
      </div>
    </div> 
    <p v-else>Belum ada konsultasi</p> -->
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Konsultasi Saya</h1>
      <button
        class="bg-teal-500 text-white py-2 px-4 rounded flex items-center"
        @click="buatKonsultasiBaru"
      >
        Konsultasi Baru
        <span class="ml-2 text-xl">+</span>
      </button>
    </div>
    <p class="text-gray-600 mb-4">Bertanya pada pakar!</p>

    <div class="bg-white shadow-md rounded-lg p-4">
      <!-- Data Konsultasi Statis -->
      <div
        v-for="(konsultasi, index) in konsultasiList"
        :key="index"
        class="flex justify-between items-center border-b last:border-b-0 py-4"
      >
        <div class="flex items-center">
          <img
            :src="konsultasi.pakarFoto"
            alt="Foto Pakar"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p class="font-semibold">{{ konsultasi.pakarNama }}</p>
            <p class="text-sm text-gray-500">{{ konsultasi.kategori }}</p>
            <p class="text-sm text-gray-600 truncate">{{ konsultasi.pesan }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-sm text-gray-400">{{ konsultasi.jam }}</p>
          <span
            class="bg-teal-500 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full"
          >
            {{ konsultasi.jumlahPesan }}
          </span>
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
      komunnitas: [],
    };
  },
  async created() {
    await this.fetchkonsultasi();
  },
  methods: {
    async fetchkonsultasi() {
      try {
        const { data } = await this.$axios.get('/konsultasi');
        
        // Akses ke data artikel dalam struktur yang tepat
        this.konsultasi = data.data.data; 
      } catch (error) {
        console.error('Gagal mengambil konsultasi:', error);
      }``
    },
    goToShow(id) {
      this.$router.push(`/konsultasi/${id}`);
    },
  },
};
</script>

<style>

</style>
