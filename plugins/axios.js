export default function ({ $axios }) {
  $axios.onRequest(config => {
    console.log('Request:', config)
  })
  
  $axios.onError(error => {
    console.log('Error:', error.response)
  })
}
