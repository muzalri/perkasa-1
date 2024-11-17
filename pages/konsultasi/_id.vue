<template>
  <div class="body pt-16 py-16">
    <!-- Header dengan foto profil dan status -->
    <div class="chat-container mt-20">
      <div class="chat-header flex items-center p-4 bg-white border-b">
        <nuxt-link to="/konsultasi" class="text-teal-600 mr-4">
          <i class="fas fa-arrow-left"></i>
        </nuxt-link>
        <img 
          :src="getUserImage(konsultasi.pakar?.profile_photo)"
          class="w-12 h-12 rounded-full mr-3"
          alt="Pakar Avatar"
        />
        <div>
          <h2 class="font-semibold">{{ konsultasi.pakar?.name }}</h2>
        </div>
      </div>

      <!-- Chat Messages -->
      <div 
        class="chat-messages flex-1" 
        ref="chatMessages"
      >
        <div v-if="konsultasi.pesans && konsultasi.pesans.length">
          <div
            v-for="pesan in konsultasi.pesans"
            :key="pesan.id"
            :class="[
              'chat-message',
              pesan.user_id === $auth.user.id ? 'sent' : 'received'
            ]"
          >
            <div class="message-content">
              <div class="flex items-start">
                <img 
                  :src="getUserImage(pesan.user?.profile_photo)"
                  class="w-8 h-8 rounded-full mr-2"
                  alt="User Avatar"
                />
                <div class="message-bubble">
                  <p v-if="pesan.isi">{{ pesan.isi }}</p>
                  <img
                    v-if="pesan.gambar"
                    :src="`http://localhost:${imagePort}/imagedb/konsultasi/${pesan.gambar}`"
                    alt="Gambar Pesan"
                    class="message-image"
                  />
                </div>
              </div>
              <span class="message-time text-xs text-gray-500 ml-10">{{ formatDate(pesan.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Chat -->
      <div class="chat-input-container">
        <!-- Preview gambar -->
        <div v-if="imagePreview" class="image-preview-wrapper">
          <img :src="imagePreview" alt="Preview" class="preview-image" />
          <button @click="cancelImage" class="cancel-preview-button">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Input chat yang sudah ada -->
        <div class="chat-input bg-white p-3 flex items-center gap-3">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden"
          />
          <button 
            @click="$refs.fileInput.click()" 
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-paperclip"></i>
          </button>
          <input
            v-model="newMessage"
            type="text"
            placeholder="Tuliskan pesan anda"
            class="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-teal-500"
          />
          <button 
            @click="sendMessage" 
            class="text-teal-500"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
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
        imagePort: 8000,
        selectedImage: null,
        imagePreview: null
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
          await this.$nextTick()
          this.scrollToBottom()
        } catch (error) {
          console.error('Gagal mengambil data konsultasi:', error)
        }
      },
      scrollToBottom() {
        if (this.$refs.chatMessages) {
          setTimeout(() => {
            this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight
          }, 100)
        }
      },
      getUserImage(profilePath) {
        return profilePath
          ? `http://localhost:${this.imagePort}/imagedb/profile_photo/${profilePath}`
          : require('~/assets/images/anwar.png')
      },
      formatDate(date) {
        const options = { hour: '2-digit', minute: '2-digit' }
        return new Date(date).toLocaleTimeString('id-ID', options)
      },
      async sendMessage() {
        if (!this.newMessage.trim() && !this.selectedImage) return

        try {
          const formData = new FormData()
          
          if (this.newMessage.trim()) {
            formData.append('isi', this.newMessage)
          }
          
          if (this.selectedImage) {
            formData.append('gambar', this.selectedImage)
          }

          const { data } = await this.$axios.post(
            `/konsultasi/${this.$route.params.id}/pesan`, 
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )

          if (data.success) {
            this.newMessage = ''
            this.cancelImage()
            await this.fetchKonsultasi()
            this.$nextTick(() => {
              this.scrollToBottom()
            })
          } else {
            throw new Error(data.message || 'Gagal mengirim pesan')
          }
        } catch (error) {
          console.error('Gagal mengirim pesan:', error)
          alert('Gagal mengirim pesan. Silakan coba lagi.')
        }
      },
      handleFileUpload(event) {
        const file = event.target.files[0]
        if (!file) return

        // Validasi ukuran (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert('Ukuran gambar maksimal 2MB')
          return
        }

        // Validasi tipe file
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
          alert('Format gambar harus jpeg, png, jpg, atau gif')
          return
        }

        this.selectedImage = file
        this.imagePreview = URL.createObjectURL(file)
      },
      cancelImage() {
        this.selectedImage = null
        this.imagePreview = null
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
      }
    },
    watch: {
      'konsultasi.pesans': {
        handler() {
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        },
        deep: true
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
    height: calc(100vh - 150px);
    max-width: 70%;
    width: 70%;
    margin: 0 auto;
    margin-top: 52px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background-color: #e6eded;
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
    min-height: 200px;
    display: flex;
    flex-direction: column;
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
    background-color: white;
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
  
  .preview-container {
    position: relative;
    display: inline-block;
    margin: 8px;
  }
  
  .preview-image {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
  }
  
  .cancel-button {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .cancel-button:hover {
    background: #cc0000;
  }
  
  .image-preview-container {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  
  .image-preview-wrapper {
    position: absolute;
    bottom: 100%;
    left: 8px;
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 8px;
    z-index: 10;
  }
  
  .preview-image {
    max-width: 150px;
    max-height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .cancel-preview-button {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff4444;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-preview-button:hover {
    background: #cc0000;
  }
  
  .chat-input-container {
    position: relative;
    padding: 8px;
    background: white;
    border-top: 1px solid #e5e7eb;
    margin-top: auto;
  }
  
  .image-preview-wrapper {
    position: absolute;
    bottom: 100%;
    left: 8px;
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 8px;
    z-index: 10;
  }
  
  .preview-image {
    max-width: 150px;
    max-height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .cancel-preview-button {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff4444;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-preview-button:hover {
    background: #cc0000;
  }
  
  .image-preview-container {
    display: none;
  }
  </style>
  