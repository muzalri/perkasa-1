<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Manajemen Kategori</h1>
      
      <!-- Form Tambah Kategori -->
      <form @submit.prevent="createCategory" class="mt-4 space-y-4">
        <div>
          <input
            v-model="newCategory"
            type="text"
            placeholder="Nama Kategori"
            class="px-4 py-2 border rounded-md"
          />
          <button 
            type="submit"
            class="ml-2 px-4 py-2 bg-teal-600 text-white rounded-md"
          >
            Tambah
          </button>
        </div>
      </form>

      <!-- Daftar Kategori -->
      <div class="mt-6">
        <div v-for="category in categories" :key="category.id" class="flex items-center justify-between p-3 bg-white rounded-md shadow mb-2">
          <span>{{ category.name }}</span>
          <button 
            @click="deleteCategory(category.id)"
            class="px-3 py-1 bg-red-600 text-white rounded-md"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  data() {
    return {
      categories: [],
      newCategory: ''
    }
  },
  async created() {
    await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/admin/categories')
        this.categories = response.data.data
      } catch (error) {
        console.error('Gagal mengambil kategori:', error)
      }
    },
    async createCategory() {
      try {
        await this.$axios.post('/admin/categories', {
          name: this.newCategory
        })
        this.newCategory = ''
        await this.fetchCategories()
      } catch (error) {
        console.error('Gagal membuat kategori:', error)
      }
    },
    async deleteCategory(id) {
      if (confirm('Yakin ingin menghapus kategori ini?')) {
        try {
          await this.$axios.delete(`/admin/categories/${id}`)
          await this.fetchCategories()
        } catch (error) {
          console.error('Gagal menghapus kategori:', error)
        }
      }
    }
  }
}
</script> 