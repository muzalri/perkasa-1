<template>
  <div class="body min-h-screen">
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16">
      <h1 class="text-2xl font-bold mb-6 text-teal-800">Buat Konsultasi Baru</h1>
    <!-- <div class="container mx-auto px-4 py-8 mt-20"> -->
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Judul -->
        <div class="mb-4">
          <label for="judul" class="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            id="judul"
            v-model="form.judul"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <!-- Pilih Pakar -->
        <div class="mb-4">
          <label for="pakar_id" class="block text-sm font-medium text-gray-700">Pilih Pakar</label>
          <select
            id="pakar_id"
            v-model="form.pakar_id"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            required
          >
            <option value="" disabled>Pilih Pakar</option>
            <option v-for="pakar in pakarList" :key="pakar.id" :value="pakar.id">
              {{ pakar.name }}
            </option>
          </select>
        </div>

        <!-- Isi Konsultasi -->
        <div class="mb-4">
          <label for="deskripsi" class="block text-sm font-medium text-gray-700">Isi Konsultasi</label>
          <textarea
            id="deskripsi"
            v-model="form.deskripsi"
            rows="5"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            required
          ></textarea>
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Publikasikan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        judul: '',
        deskripsi: '',
        pakar_id: '',
        image: null,
      },
      pakarList: [], // Daftar pakar dari API
    };
  },
  async created() {
    await this.fetchPakarList();
  },
  methods: {
    async fetchPakarList() {
      try {
        const { data } = await this.$axios.get('/konsultasi/pakar'); // Endpoint untuk mengambil daftar pakar
        this.pakarList = data.data;
      } catch (error) {
        console.error('Gagal mengambil daftar pakar:', error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file;
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('judul', this.form.judul);
      formData.append('deskripsi', this.form.deskripsi);
      formData.append('pakar_id', this.form.pakar_id);

      try {
        const { data } = await this.$axios.post('/konsultasi', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Konsultasi berhasil dibuat!');
        this.$router.push(`/konsultasi/${data.data.id}`);
      } catch (error) {
        console.error('Gagal membuat konsultasi:', error.response.data);
        alert('Terjadi kesalahan, coba lagi.');
      }
    },
  },
};
</script>

<style scoped>
.body {
  background-image: url('~/assets/images/pattern.png');
  background-size: 1000px 1000px;
  background-repeat: repeat;
  min-height: 100vh;
  padding: 40px 0;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
