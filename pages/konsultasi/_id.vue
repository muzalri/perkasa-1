<template>
    <div class="body pt-16 py-16">
      <!-- Tombol Kembali -->
      <div class="max-w-600px mx-auto mb-4 px-4 mt-20 ml-40">
        <nuxt-link 
          to="/konsultasi" 
          class="flex items-center text-teal-600 hover:text-teal-800 mb-4"
        >
          <i class="fas fa-arrow-left mr-2"></i> Kembali
        </nuxt-link>
      </div>
  
      <div class="chat-container mt-20">
        <!-- Header Chat -->
        <div class="chat-header">
          <h2>{{ konsultasi.judul }}</h2>
          <p>{{ konsultasi.pakar?.name }}</p>
        </div>
  
        <!-- Pesan Chat -->
        <div 
          class="chat-messages" 
          ref="chatMessages"
          v-if="konsultasi.pesans && konsultasi.pesans.length"
        >
          <div
            v-for="pesan in konsultasi.pesans"
            :key="pesan.id"
            :class="[
              'chat-message',
              pesan.user_id === $auth.user.id ? 'sent' : 'received'
            ]"
          >
            <div class="message-content">
              <div class="message-header">
                <img 
                  :src="getUserImage(pesan.user?.profile_photo)"
                  class="avatar"
                  alt="User Avatar"
                />
                <span class="username">{{ pesan.user?.name }}</span>
              </div>
              <div class="message-bubble">
                <p v-if="pesan.isi">{{ pesan.isi }}</p>
                <img
                  v-if="pesan.gambar_url"
                  :src="pesan.gambar_url"
                  alt="Gambar Pesan"
                  class="message-image"
                />
              </div>
              <span class="message-time">{{ formatDate(pesan.created_at) }}</span>
            </div>
          </div>
        </div>
  
        <!-- Input Chat -->
        <div class="chat-input bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden"
          />
          <button 
            @click="$refs.fileInput.click()" 
            class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <img 
              src="~/assets/images/link.png" 
              alt="Upload Image"
              class="w-10 h-6"
            />
          </button>
          <input
            v-model="newMessage"
            type="text"
            placeholder="Ketik pesan..."
            class="flex-1 h-10 px-4 text-gray-700 bg-transparent outline-none"
          />
          <button 
            @click="sendMessage" 
            class="px-6 py-2 bg-teal-800 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        konsultasi: {
          judul: '',
          pakar: {},
          pesans: []
        },
        newMessage: '',
        imagePort: 8000
      }
    },
    async mounted() {
      await this.fetchKonsultasi()
      this.scrollToBottom()
    },
    methods: {
      async fetchKonsultasi() {
        try {
          const { data } = await this.$axios.get(`/konsultasi/${this.$route.params.id}`)
          this.konsultasi = data.data
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        } catch (error) {
          console.error('Gagal mengambil data konsultasi:', error)
        }
      },
      scrollToBottom() {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight
        }
      },
      getUserImage(profilePath) {
        return profilePath
          ? `http://localhost:${this.imagePort}/storage/${profilePath}`
          : require('~/assets/images/anwar.png')
      },
      formatDate(date) {
        const options = { hour: '2-digit', minute: '2-digit' }
        return new Date(date).toLocaleTimeString('id-ID', options)
      },
      async sendMessage() {
        if (!this.newMessage.trim()) return

        try {
          await this.$axios.post(`/konsultasi/${this.$route.params.id}/pesan`, {
            isi: this.newMessage
          })
          this.newMessage = ''
          await this.fetchKonsultasi()
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        } catch (error) {
          console.error('Gagal mengirim pesan:', error)
        }
      },
      async handleFileUpload(event) {
        const file = event.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('gambar', file)

        try {
          await this.$axios.post(`/konsultasi/${this.$route.params.id}/pesan/gambar`, formData)
          await this.fetchKonsultasi()
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        } catch (error) {
          console.error('Gagal mengunggah gambar:', error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .body {
    background-image: url('~/assets/images/pattern.png'); /* Ganti dengan path pattern Anda */
    background-size: 1000px 1000px; /* Mengatur ukuran pattern menjadi kecil */
    background-repeat: repeat; /* Mengulang pattern */
    background-position: center; /* Pusatkan pattern */
    padding-top: 40px;
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 52px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .chat-header {
    padding: 16px;
    background-color: #064e50;
    color: #fff;
    text-align: center;
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  
  .chat-message {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .message-content {
    max-width: 70%;
    padding: 10px;
    border-radius: 12px;
  }
  
  .sent {
    align-items: flex-end;
  }
  
  .sent .message-content {
    background-color: #064e50;
    color: white;
    margin-left: auto;
  }
  
  .received {
    align-items: flex-start;
  }
  
  .received .message-content {
    background-color: #f0f0f0;
    color: black;
  }
  
  .message-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .username {
    font-size: 0.9em;
    font-weight: 500;
  }
  
  .message-bubble {
    padding: 8px 12px;
    border-radius: 12px;
  }
  
  .message-time {
    font-size: 0.8em;
    margin-top: 4px;
    opacity: 0.7;
  }
  
  .message-image {
    max-width: 200px;
    border-radius: 8px;
    margin-top: 8px;
  }
  
  .chat-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: white;
    border-top: 1px solid #e5e7eb;
  }
  
  .chat-input textarea {
    flex: 1;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .chat-input input[type='file'] {
    display: none;
  }
  
  .chat-input button {
    margin-left: 8px;
    padding: 10px 16px;
    background-color: #064e50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .chat-input button:hover {
    background-color: #053d3e;
  }
  
  .upload-btn, .send-btn {
    padding: 8px 12px;
    border-radius: 8px;
    background: #064e50;
    color: white;
    font-size: 14px;
    transition: all 0.2s;
  }
  
  .upload-btn:hover, .send-btn:hover {
    opacity: 0.9;
  }
  </style>
  