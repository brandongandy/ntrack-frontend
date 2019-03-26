<template>
  <b-container class="col-sm-12 col-lg-6">
    <h2 class="m-3">Welcome back, {{ this.$auth.user.given_name }}!</h2>
    <b-row>
      <b-col sm="6" class="mt-2">
        <b-card :title="`${goal.goal_type} Today`">
          <b-card-text><h2>0</h2></b-card-text>
          <b-card-text><span class="text-muted">Goal: </span>{{ this.goal.goal_amount }}</b-card-text>
          <b-button variant="primary" size="sm" v-b-modal.update-goal>Add Words</b-button>
          <b-button variant="info" size="sm" v-b-modal.work-goal>Change Goal</b-button>
        </b-card>
      </b-col>
      <b-col sm="6" class="mt-2">
        <b-card title="Last Updated Project">
          <b-card-text><h2>{{ latestProject.name }}</h2></b-card-text>
          <b-card-text><span class="text-muted">Type: </span>Novel</b-card-text>
          <b-button variant="primary" size="sm" to="/project/12">View Details</b-button>
          <b-button variant="success" size="sm" to="/new-project">Start New Project</b-button>
        </b-card>
      </b-col>
      <!-- <b-col sm="6" class="mt-2">
        <b-card title="Latest Query">
          <b-card-text><h2>Agent pitch</h2></b-card-text>
          <b-card-text><span class="text-muted">Last update: </span>2019/02/15</b-card-text>
          <b-button variant="primary" size="sm">View Details</b-button>
          <b-button variant="success" size="sm">Open New Query</b-button>
        </b-card>
      </b-col> -->
    </b-row>
    <update-goal />
    <work-goal :goal.sync="goalObj" />
  </b-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'
import WorkGoal from '../components/WorkGoal'

export default {
  data () {
    return {
      msg: this.$auth.user.name,
      goal: {},
      latestProject: {
        id: null,
        name: 'No projects yet!'
      }
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
    UpdateGoal,
    WorkGoal
  },
  mounted () {
    this.$axios.get('/goals?user_id=' + this.$auth.userId)
      .then(
        res => {
          this.goalObj = Object.assign({}, res.data[0])
        },
        err => {
          this.$alert.danger({ message: err })
        }
      )

    this.$axios.get('/projects?latest=true').then(
      res => {
        this.latestProject = res.data
      },
      err => {
        this.$alert.danger({ message: err })
      }
    )
  }
}
</script>
