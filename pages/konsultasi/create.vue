<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <h1 class="text-3xl font-bold text-teal-800 mb-6">Buat Konsultasi Baru</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Judul -->
      <div>
        <label for="judul" class="block text-sm font-medium text-gray-700">Judul</label>
        <input
          type="text"
          id="judul"
          v-model="form.judul"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          required
        />
      </div>

      <!-- Isi Konsultasi -->
      <div>
        <label for="deskripsi" class="block text-sm font-medium text-gray-700">Isi Konsultasi</label>
        <textarea
          id="deskripsi"
          v-model="form.deskripsi"
          rows="5"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          required
        ></textarea>
      </div>

      <!-- Pilih Pakar -->
      <div>
        <label for="pakar_id" class="block text-sm font-medium text-gray-700">Pilih Pakar</label>
        <select
          id="pakar_id"
          v-model="form.pakar_id"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          required
        >
          <option value="" disabled>Pilih Pakar</option>
          <option v-for="pakar in pakarList" :key="pakar.id" :value="pakar.id">
            {{ pakar.name }}
          </option>
        </select>
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
.container {
  max-width: 75%;
}
</style>
