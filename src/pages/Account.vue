<template>
  <b-container class="text-left col-sm-12 col-lg-6">
    <b-row>
      <b-col>
        <h3>Account Details</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <p><strong>Email:</strong> {{ $auth.user.email }}</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <p><strong>Current Plan:</strong> Basic</p>
      </b-col>
    </b-row>

    <b-row><b-col><h4>Plans:</h4></b-col></b-row>
    <b-row class="text-center">
      <b-col>
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary"><h5>Basic</h5><i>Free</i></li>
          <li class="list-group-item list-group-item-light">Features:</li>
          <li class="list-group-item">Up to 5 Projects</li>
          <li class="list-group-item">Word count tracking</li>
          <li class="list-group-item">1 Query Tracked <font-awesome-icon icon="question-circle" v-b-popover.hover="'Coming soon!'"></font-awesome-icon></li>
          <li class="list-group-item">Calendar Streak Tracker</li>
        </ul>
        <b-button class="align-center mt-2">Already Active</b-button>
      </b-col>
      <b-col>
        <ul class="list-group">
          <li class="list-group-item list-group-item-success"><h5>Pro</h5><i>$4.99/mo</i></li>
          <li class="list-group-item list-group-item-light">Features:</li>
          <li class="list-group-item"><span v-b-popover.hover="'Coming soon!'">Unlimited Projects</span></li>
          <li class="list-group-item">Word count tracking</li>
          <li class="list-group-item">Unlimited Queries Tracked</li>
          <li class="list-group-item">Calendar Streak Tracker</li>
          <li class="list-group-item">Advanced Writing Stats</li>
          <li class="list-group-item">App Integration <font-awesome-icon icon="question-circle" v-b-popover.hover="'Plug in to apps like Scrivener and Google Docs to automatically track your word count progress for you!'"></font-awesome-icon></li>
          <li class="list-group-item">Cloud Backups</li>
        </ul>
        <b-button class="align-center mt-2" variant="success">Purchase</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {

  }
}
</script>
