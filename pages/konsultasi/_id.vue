<template>
    <div class="body pt-16 py-16">
      <div class="chat-container mt-20">
        <!-- Header Chat -->
        <div class="chat-header">
          <h2>{{ konsultasi.judul }}</h2>
          <p>{{ konsultasi.pakar.name }}</p>
        </div>
  
        <!-- Pesan Chat -->
        <div class="chat-messages" ref="chatMessages">
          <div
            v-for="pesan in konsultasi.pesans"
            :key="pesan.id"
            :class="['chat-message', pesan.user_id === userId ? 'sent' : 'received']"
          >
            <div class="message-content">
              <p v-if="pesan.isi">{{ pesan.isi }}</p>
              <img
                v-if="pesan.gambar_url"
                :src="pesan.gambar_url"
                alt="Gambar Pesan"
                class="message-image"
              />
              <span class="message-time">{{ formatDate(pesan.created_at) }}</span>
            </div>
          </div>
        </div>
  
        <!-- Input Chat -->
        <div class="chat-input">
          <textarea
            v-model="pesanBaru"
            placeholder="Tulis pesan..."
            @keyup.enter="kirimPesan"
          ></textarea>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden"
          />
          <button @click="triggerFileInput">📎</button>
          <button @click="kirimPesan">Kirim</button>
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
          pakar: { name: '' },
          pesans: [],
        },
        pesanBaru: '',
        userId: null, // Ganti dengan ID pengguna saat ini
        selectedFile: null,
      };
    },
    async created() {
      await this.fetchKonsultasi();
      this.scrollToBottom();
    },
    methods: {
      async fetchKonsultasi() {
        try {
          const { data } = await this.$axios.get(`/konsultasi/${this.$route.params.id}`);
          this.konsultasi = data.data;
          this.userId = data.user_id; // Asumsikan API mengembalikan ID pengguna saat ini
        } catch (error) {
          console.error('Gagal mengambil detail konsultasi:', error);
        }
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          this.selectedFile = file;
          this.kirimPesan();
        } else {
          alert('Harap pilih file gambar.');
        }
      },
      async kirimPesan() {
        if (!this.pesanBaru.trim() && !this.selectedFile) return;
  
        const formData = new FormData();
        formData.append('isi', this.pesanBaru);
        if (this.selectedFile) {
          formData.append('gambar', this.selectedFile);
        }
  
        try {
          const { data } = await this.$axios.post(
            `/konsultasi/${this.konsultasi.id}/pesan`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          this.konsultasi.pesans.push(data.data);
          this.pesanBaru = '';
          this.selectedFile = null;
          this.$refs.fileInput.value = '';
          this.scrollToBottom();
        } catch (error) {
          console.error('Gagal mengirim pesan:', error);
        }
      },
      formatDate(date) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleTimeString('id-ID', options);
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const chatMessages = this.$refs.chatMessages;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
      },
    },
  };
  </script>
  
  <style>
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
    padding: 16px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
  
  .chat-message {
    display: flex;
    margin-bottom: 12px;
  }
  
  .chat-message.sent {
    justify-content: flex-end;
  }
  
  .chat-message.received {
    justify-content: flex-start;
  }
  
  .message-content {
    max-width: 70%;
    padding: 10px;
    border-radius: 8px;
    background-color: #e0f7fa;
    position: relative;
  }
  
  .chat-message.sent .message-content {
    background-color: #064e50;
    color: #fff;
  }
  
  .message-time {
    display: block;
    margin-top: 4px;
    font-size: 0.75rem;
    color: #666;
    text-align: right;
  }
  
  .message-image {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 8px;
  }
  
  .chat-input {
    display: flex;
    padding: 16px;
    background-color: #fff;
    border-top: 1px solid #ccc;
  }
  
  .chat-input textarea {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
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
  </style>
  