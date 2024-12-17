<template>
  <div>
  </div>
</template>
//p
<script>
export default {
  name: 'IndexPage',
  middleware: 'guest',
  beforeCreate() {
    this.$router.push('/authentikasi/login')
  }
}
</script> 