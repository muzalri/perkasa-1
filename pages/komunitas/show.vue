<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">{{ komunitas.title }}</h1>
      <p class="text-gray-600 mb-4">Kategori: {{ komunitas.category?.name }}</p>
      <p class="mb-6">{{ komunitas.body }}</p>
  
      <div class="mb-6">
        <h2 class="text-xl font-semibold">Likes: {{ komunitas.likes.length }}</h2>
        <button @click="toggleLike(true)" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Like</button>
        <button @click="toggleLike(false)" class="bg-red-500 text-white px-4 py-2 rounded">Dislike</button>
      </div>
  
      <div>
        <h2 class="text-lg font-semibold mb-2">Komentar</h2>
        <div v-for="komentar in komunitas.komentars" :key="komentar.id" class="border-b mb-2 pb-2">
          <p class="font-medium">{{ komentar.user.name }}:</p>
          <p>{{ komentar.body }}</p>
        </div>
      </div>
  
      <form @submit.prevent="submitKomentar" class="mt-4">
        <textarea v-model="newKomentar" class="w-full border rounded p-2" placeholder="Tulis komentar..." required></textarea>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded mt-2">Kirim Komentar</button>
      </form>
  
      <div v-if="isAuthor" class="mt-4">
        <nuxt-link :to="`/komunitas/edit/${komunitas.id}`" class="bg-yellow-500 text-white px-4 py-2 rounded">Edit</nuxt-link>
        <button @click="deleteKomunitas" class="bg-red-500 text-white px-4 py-2 rounded ml-2">Hapus</button>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      komunitas: {}, // Data komunitas detail
      newKomentar: '', // Input untuk komentar baru
      isAuthor: false, // Untuk cek apakah user adalah author
    };
  },
  async created() {
    await this.fetchKomunitas(); // Memanggil data komunitas ketika komponen dimuat
  },
  methods: {
    async fetchKomunitas() {
      const id = this.$route.params.id; // Mendapatkan ID dari URL
      try {
        const { data } = await this.$axios.get(`/komunitas/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Menambahkan token
            Accept: 'application/json',
          },
        });
        this.komunitas = data.data; // Menyimpan data komunitas
        this.isAuthor = this.komunitas.user.id === this.$auth?.user?.id; // Cek apakah user adalah author
      } catch (error) {
        console.error('Gagal mengambil data komunitas:', error);
      }
    },
    async toggleLike(isLike) {
      try {
        await this.$axios.post(`/komunitas/${this.komunitas.id}/like`, { is_like: isLike }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        });
        await this.fetchKomunitas(); // Refresh data setelah like
      } catch (error) {
        console.error('Gagal mengupdate like:', error);
      }
    },
    async submitKomentar() {
      try {
        await this.$axios.post(`/komunitas/${this.komunitas.id}/komentar`, { body: this.newKomentar }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        });
        this.newKomentar = ''; // Kosongkan input komentar
        await this.fetchKomunitas(); // Refresh data komentar
      } catch (error) {
        console.error('Gagal menambahkan komentar:', error);
      }
    },
    async deleteKomunitas() {
      if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
        try {
          await this.$axios.delete(`/komunitas/${this.komunitas.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              Accept: 'application/json',
            },
          });
          this.$router.push('/komunitas'); // Redirect ke halaman daftar komunitas setelah hapus
        } catch (error) {
          console.error('Gagal menghapus artikel:', error);
        }
      }
    },
  },
};

</script>

  