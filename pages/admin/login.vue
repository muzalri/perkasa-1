<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-900">
          Login Admin
        </h2>
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="form.email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="form.password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
        >
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true
        this.error = null
        
        const response = await this.$axios.post('/api/admin/login', this.form)

        if (response.data.success) {
          const token = response.data.token
          
          if (process.client) {
            localStorage.setItem('admin_token', token)
            this.$axios.setHeader('Authorization', `Bearer ${token}`)
            localStorage.removeItem('token')
            localStorage.removeItem('auth._token.local')
          }
          
          await this.$router.push('/admin/dashboard')
        }
      } catch (err) {
        console.error('Login error:', err)
        this.error = err.response?.data?.message || 'Login gagal'
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    if (process.client) {
      localStorage.removeItem('admin_token')
      this.$axios.setHeader('Authorization', null)
    }
  }
}
</script>
