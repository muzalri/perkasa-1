<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <h1 class="text-3xl font-bold text-teal-800 mb-6">Buat Konsultasi Baru</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Judul -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          required
        />
      </div>

      <!-- Kategori -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Kategori</label>
        <select
          id="category"
          v-model="form.category"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          required
        >
          <option value="" disabled>Pilih Kategori</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Isi Konsultasi -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Isi Konsultasi</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="5"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          required
        ></textarea>
      </div>

      <!-- Gambar -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Gambar (opsional)</label>
        <input
          type="file"
          id="image"
          @change="handleImageUpload"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          accept="image/*"
        />
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
        title: '',
        category: '',
        content: '',
        image: null,
      },
      categories: [],
    };
  },
  async created() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await this.$axios.get('/konsultasi/categories');
        this.categories = data.data;
      } catch (error) {
        console.error('Gagal mengambil kategori:', error);
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
      formData.append('title', this.form.title);
      formData.append('category', this.form.category);
      formData.append('content', this.form.content);
      if (this.form.image) {
        formData.append('image', this.form.image);
      }

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
