<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Buat Konsultasi Baru</h1>
    
    <form @submit.prevent="submitConsultation" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Judul
        </label>
        <input 
          v-model="form.title"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Pilih Pakar
        </label>
        <select 
          v-model="form.expert"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Pilih Pakar Ahli</option>
          <option v-for="expert in experts" :key="expert.id" :value="expert.id">
            {{ expert.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end space-x-4">
        <NuxtLink 
          to="/konsultasi"
          class="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Batal
        </NuxtLink>
        <button 
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Buat Konsultasi
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
        expert: ''
      },
      experts: [
        { id: 1, name: 'Pakar Ahli 1' },
        { id: 2, name: 'Pakar Ahli 2' }
      ]
    }
  },
  methods: {
    async submitConsultation() {
      // Implement submission logic
    }
  }
}
</script>
