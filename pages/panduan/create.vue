<template>
  <div class="body">
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16">
      <h1 class="text-2xl font-bold mb-6 text-teal-800">Buat Panduan Baru</h1>
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
          <label for="image" class="block text-sm font-medium text-gray-700">Gambar</label>
          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            accept="image/*"
          />
        </div>

        <!-- Pratinjau Gambar -->
        <div v-if="imagePreview" class="mb-4">
          <p class="text-sm font-medium text-gray-700">Pratinjau Gambar:</p>
          <img :src="imagePreview" alt="Pratinjau Gambar" class="w-full h-auto rounded-md shadow-md mt-2" />
        </div>

        <!-- Video -->
        <div class="mb-4">
          <label for="video" class="block text-sm font-medium text-gray-700">Video (Opsional)</label>
          <input
            type="file"
            id="video"
            @change="handleVideoUpload"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500"
            accept="video/*"
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
  </div>
</template>

<script>
export default {
  middleware: 'auth',
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
      imagePreview: null
    }
  },
  async created() {
    if (!this.$auth.user || this.$auth.user.role !== 'pakar') {
      this.$router.push('/panduan')
      return
    }
    await this.fetchCategories()
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
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.image = file
        this.createImagePreview(file)
      }
    },
    handleVideoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.video = file
      }
    },
    createImagePreview(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async submitForm() {
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('content', this.form.content)
      formData.append('category_id', this.form.category_id)
      if (this.form.image) formData.append('image', this.form.image)
      if (this.form.video) formData.append('video', this.form.video)

      try {
        const { data } = await this.$axios.post('/guide-books', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$router.push(`/panduan/${data.data.id}`)
      } catch (error) {
        console.error('Gagal membuat panduan:', error)
        alert('Terjadi kesalahan saat membuat panduan')
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
