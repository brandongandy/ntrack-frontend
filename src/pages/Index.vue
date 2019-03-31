<template>
  <b-container class="col-sm-12 col-lg-6">
    <h2 class="m-3">Welcome back, {{ this.$auth.user.given_name }}!</h2>
    <b-row>
      <b-col sm="6" class="mt-2">
        <b-card title="Word Count Today">
          <b-card-text><h3>{{ this.goal.words_today }}</h3></b-card-text>
          <b-card-text><span class="text-muted">Goal: </span>{{ this.goal.goal_amount }}</b-card-text>
          <b-button variant="primary" size="sm" v-b-modal.update-goal>Add Words</b-button>
          <b-button variant="info" size="sm" v-b-modal.work-goal>Change Goal</b-button>
        </b-card>
      </b-col>
      <b-col sm="6" class="mt-2">
        <b-card title="Last Updated Project">
          <b-card-text><h3>{{ latestProject.name }}</h3></b-card-text>
          <b-card-text v-if="latestProject.project_type_id"><span class="text-muted">Type: </span>Novel</b-card-text>
          <b-button variant="primary" size="sm" :to="`/project/${latestProject.id}`"
            v-if="latestProject.id">
            View Details
          </b-button>
          <b-button variant="success" size="sm" to="/new-project">Start New Project</b-button>
        </b-card>
      </b-col>
      <b-col sm="12" class="mt-2">
        <work-calendar />
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
    <work-goal :goal.sync="goal" />
  </b-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'
import WorkGoal from '../components/WorkGoal'
import WorkCalendar from '@/components/WorkCalendar'

export default {
  data () {
    return {
      msg: this.$auth.user.name,
      goal: {
        words_today: 0,
        goal_amount: 0
      },
      latestProject: {
        id: null,
        name: 'No projects yet!'
      }
    }
  },
  components: {
    UpdateGoal,
    WorkGoal,
    WorkCalendar
  },
  beforeCreate () {
    this.$axios.get('/goals')
      .then(
        res => {
          if (res.data.amount > 0) {
            this.goal = res.data
          }
        },
        err => {
          this.$alert.danger({ message: err })
        }
      )

    this.$axios.get('/projects/latest').then(
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
