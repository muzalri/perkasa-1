<template>
  <div class="mt-6 bg-gray-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-4 text-teal-800">Tambah Komentar</h3>
    <form @submit.prevent="submitKomentar" class="space-y-4">
      <div>
        <textarea
          v-model="form.body"
          rows="3"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 resize-none"
          placeholder="Tulis komentar Anda..."
          required
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
        >
          Kirim Komentar
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  export default {
    props: {
      komunitasId: {
        type: [Number, String],
        required: true
      }
    },
    data() {
      return {
        form: {
          body: ''
        }
      }
    },
    methods: {
      async submitKomentar() {
        try {
          const response = await this.$axios.post(
            `/komunitas/${this.komunitasId}/komentar`,
            this.form,
            {
              headers: {
                'Authorization': `Bearer ${this.$auth.strategy.token.get()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          )
  
          if (response.data.success) {
            // Reset form
            this.form.body = ''
            
            // Emit event untuk memperbarui daftar komentar
            this.$emit('komentar-added', response.data.data)
            
            // Optional: Tampilkan pesan sukses
            alert('Komentar berhasil ditambahkan')
          }
        } catch (error) {
          console.error('Gagal menambahkan komentar:', error)
          alert('Gagal menambahkan komentar. Silakan coba lagi.')
        }
      }
    }
  }
  </script>