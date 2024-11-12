<template>
  <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Buat Artikel Baru</h1>
      <form @submit.prevent="submitForm">
          <!-- Judul -->
          <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
              <input
                  type="text"
                  id="title"
                  v-model="form.title"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
              />
          </div>

          <!-- Kategori -->
          <div class="mb-4">
              <label for="komunitas_category_id" class="block text-sm font-medium text-gray-700">Kategori</label>
              <select
                  id="komunitas_category_id"
                  v-model="form.komunitas_category_id"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
              >
                  <option value="">Pilih Kategori</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                  </option>
              </select>
          </div>

          <!-- Isi Artikel -->
          <div class="mb-4">
              <label for="body" class="block text-sm font-medium text-gray-700">Isi Artikel</label>
              <textarea
                  id="body"
                  v-model="form.body"
                  rows="5"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
              ></textarea>
          </div>

          <!-- Gambar -->
          <div class="mb-4">
              <label for="image" class="block text-sm font-medium text-gray-700">Gambar</label>
              <input
                  type="file"
                  id="image"
                  @change="handleImageUpload"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  accept="image/*"
              />
          </div>

          <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded"
          >
              Publikasikan
          </button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          form: {
              title: '',
              komunitas_category_id: '',
              body: '',
              image: null, // Menyimpan file gambar
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
              const { data } = await this.$axios.get('/komunitas/categories');
              this.categories = data.data;
          } catch (error) {
              console.error('Gagal mengambil kategori:', error);
          }
      },
      async submitForm() {
          const formData = new FormData();
          formData.append('title', this.form.title);
          formData.append('komunitas_category_id', this.form.komunitas_category_id);
          formData.append('body', this.form.body);
          if (this.form.image) {
              formData.append('image', this.form.image); // Menambahkan gambar ke FormData
          }

          try {
              const { data } = await this.$axios.post('/komunitas', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              });
              alert('Artikel berhasil dibuat!');
              this.$router.push(`/komunitas/show/${data.data.id}`);
          } catch (error) {
              console.error('Gagal membuat artikel:', error.response.data);
          }
      },
      handleImageUpload(event) {
          const file = event.target.files[0];
          if (file) {
              this.form.image = file; // Menyimpan file gambar ke dalam form
          }
      },
  },
};
</script> 