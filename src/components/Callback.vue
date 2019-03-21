<template>
  <b-container>
    <h1>Loading...</h1>
  </b-container>
</template>

<script>
export default {
  name: 'callback',
  mounted () {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push('/')
    })
  }
}
</script>
