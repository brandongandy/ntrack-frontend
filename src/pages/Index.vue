<template>
  <b-container>
    <h2 class="m-3">Welcome back, {{ this.$auth.user.given_name }}</h2>
    <b-row>
      <b-col sm="12" md="4">
        <b-card
          title="Words Written Today">
          <b-card-text><h2>0</h2></b-card-text>
          <b-card-text><span class="text-muted">Goal: </span>{{ this.goal }}</b-card-text>
          <b-button variant="primary" size="sm" v-b-modal.update-goal>Add Words</b-button>
          <b-button variant="info" size="sm">Change Goal</b-button>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card title="Last Updated Project">
          <b-card-text><h2>1Q84</h2></b-card-text>
          <b-card-text><span class="text-muted">Type: </span>Novel</b-card-text>
          <b-button variant="primary" size="sm" to="/project/12">View Details</b-button>
          <b-button variant="success" size="sm" to="/new-project">Start New Project</b-button>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card title="Latest Query">
          <b-card-text><h2>Agent pitch</h2></b-card-text>
          <b-card-text><span class="text-muted">Last update: </span>2019/02/15</b-card-text>
          <b-button variant="primary" size="sm">View Details</b-button>
          <b-button variant="success" size="sm">Open New Query</b-button>
        </b-card>
      </b-col>
    </b-row>
    <update-goal project-name="sdgf" />
  </b-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'

export default {
  data () {
    return {
      msg: this.$auth.user.name,
      goal: 0
    }
  },
  computed: {
    goalObj: {
      get: function () {
        return this.goal
      },
      set: function (val) {
        this.goal = val
      }
    }
  },
  components: {
    UpdateGoal
  },
  created () {
    let user = JSON.parse(localStorage.getItem('user'))
    this.$axios.get('/goals?user_id=' + user.sub)
      .then(
        res => {
          this.goalObj = res.data[0].goal_amount
        },
        err => {
          console.log(err)
        }
      )
  }
}
</script>
