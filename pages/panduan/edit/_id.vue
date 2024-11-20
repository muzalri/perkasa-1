<template>
    <div class="body">
      <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16">
        <div class="flex items-center mb-6">
          <nuxt-link to="/panduan" class="text-teal-600 hover:text-teal-800 mr-4">
            <i class="fas fa-arrow-left"></i> Kembali
          </nuxt-link>
          <h1 class="text-2xl font-bold text-teal-800">Edit Panduan</h1>
        </div>
  
        <form @submit.prevent="submitForm">
          <!-- Judul -->
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>
  
          <!-- Kategori -->
          <div class="mb-4">
            <label for="category_id" class="block text-sm font-medium text-gray-700">Kategori</label>
            <select
              id="category_id"
              v-model="form.category_id"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
  
          <!-- Isi Panduan -->
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">Isi Panduan</label>
            <textarea
              id="content"
              v-model="form.content"
              rows="5"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              required
            ></textarea>
          </div>
  
          <!-- Gambar -->
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Gambar Baru (Opsional)</label>
            <input
              type="file"
              id="image"
              @change="handleImageUpload"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              accept="image/*"
            />
          </div>
  
          <!-- Gambar Saat Ini -->
          <div v-if="currentImage" class="mb-4">
            <p class="text-sm font-medium text-gray-700">Gambar Saat Ini:</p>
            <img :src="currentImage" alt="Current Image" class="mt-2 max-w-xs rounded-lg" />
          </div>
  
          <!-- Video -->
          <div class="mb-4">
            <label for="video" class="block text-sm font-medium text-gray-700">Video Baru (Opsional)</label>
            <input
              type="file"
              id="video"
              @change="handleVideoUpload"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
              accept="video/*"
            />
          </div>
  
          <!-- Video Saat Ini -->
          <div v-if="currentVideo" class="mb-4">
            <p class="text-sm font-medium text-gray-700">Video Saat Ini:</p>
            <video :src="currentVideo" controls class="mt-2 max-w-xs rounded-lg"></video>
          </div>
  
          <!-- Tombol Submit -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-gradient-to-t from-[#064e50] to-[#0A585B] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              Update Panduan
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
          title: '',
          category_id: '',
          content: '',
          image: null,
          video: null
        },
        categories: [],
        currentImage: null,
        currentVideo: null,
        imagePort: 8000
      }
    },
    async created() {
      if (!this.$auth.user || this.$auth.user.role !== 'pakar') {
        this.$router.push('/panduan')
        return
      }
      await this.fetchCategories()
      await this.fetchGuideBook()
    },
    methods: {
      async fetchCategories() {
        try {
          const { data } = await this.$axios.get('/komunitas/categories')
          this.categories = data.data
        } catch (error) {
          console.error('Gagal mengambil kategori:', error)
        }
      },
      async fetchGuideBook() {
        try {
          const { data } = await this.$axios.get(`/guide-books/${this.$route.params.id}`)
          const guideBook = data.data
          
          this.form.title = guideBook.title
          this.form.category_id = guideBook.category_id
          this.form.content = guideBook.content
          
          if (guideBook.image_path) {
            this.currentImage = `https://perkasa.miauwlan.com/imagedb/guide_book/images/${guideBook.image_path}`
          }
          if (guideBook.video_path) {
            this.currentVideo = `https://perkasa.miauwlan.com/imagedb/guide_book/videos/${guideBook.video_path}`
          }
        } catch (error) {
          console.error('Gagal mengambil data panduan:', error)
          this.$router.push('/panduan')
        }
      },
      handleImageUpload(event) {
        const file = event.target.files[0]
        if (file) {
          if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimal 2MB')
            event.target.value = ''
            return
          }
          if (!['image/jpeg', 'image/png'].includes(file.type)) {
            alert('Format file tidak didukung. Gunakan JPG atau PNG')
            event.target.value = ''
            return
          }
          this.form.image = file
        }
      },
      handleVideoUpload(event) {
        const file = event.target.files[0]
        if (file) {
          this.form.video = file
        }
      },
      async submitForm() {
        try {
          const formData = new FormData()
          formData.append('title', this.form.title)
          formData.append('content', this.form.content)
          formData.append('category_id', this.form.category_id)
          if (this.form.image) formData.append('image', this.form.image)
          if (this.form.video) formData.append('video', this.form.video)
          formData.append('_method', 'PUT')
  
          const response = await this.$axios.post(`/guide-books/${this.$route.params.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
  
          if (response.data.success) {
            alert('Panduan berhasil diupdate!')
            this.$router.push('/panduan')
          }
        } catch (error) {
          console.error('Gagal mengupdate panduan:', error)
          alert('Gagal mengupdate panduan. Silakan coba lagi.')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .body {
    background-image: url('~/assets/images/pattern.png');
    background-size: 1000px 1000px;
    background-repeat: repeat;
    background-position: center;
  }
  </style>