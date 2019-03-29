<template>
  <b-card title="Work History">
    <table class="table">
      <thead>
        <tr>
          <th>Monday</th>
        </tr>
      </thead>
    </table>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      currentMonth: new Date().getMonth()
    }
  }
}
</script>
