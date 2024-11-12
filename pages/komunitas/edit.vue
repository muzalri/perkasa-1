<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Edit Artikel</h1>
    <form @submit.prevent="updateKomunitas">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
        <input type="text" id="title" v-model="form.title" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div class="mb-4">
        <label for="komunitas_category_id" class="block text-sm font-medium text-gray-700">Kategori</label>
        <select id="komunitas_category_id" v-model="form.komunitas_category_id" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
          <option value="">Pilih Kategori</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="body" class="block text-sm font-medium text-gray-700">Isi Artikel</label>
        <textarea id="body" v-model="form.body" rows="5" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
      </div>
      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Update</button>
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
      },
      categories: [],
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.fetchKomunitas(id);
    await this.fetchCategories();
  },
  methods: {
    async fetchKomunitas(id) {
      try {
        const { data } = await axios.get(`/api/komunitas/${id}`);
        this.form = data.data;
      } catch (error) {
        console.error('Gagal mengambil komunitas:', error);
      }
    },
    async fetchCategories() {
      try {
        const { data } = await axios.get('/api/komunitas_categories'); // Ganti dengan endpoint kategori yang sesuai
        this.categories = data.data;
      } catch (error) {
        console.error('Gagal mengambil kategori:', error);
      }
    },
    async updateKomunitas() {
      const id = this.$route.params.id;
      try {
        await axios.put(`/api/komunitas/${id}`, this.form);
        alert('Artikel berhasil diupdate!');
        this.$router.push('/komunitas');
      } catch (error) {
        console.error('Gagal mengupdate artikel:', error);
      }
    },
  },
};
</script> 