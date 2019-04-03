<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title><h3 class="headline">Word Count Today</h3></v-card-title>
          <v-card-text><h3>{{ this.goal.words_today }}</h3> of {{ this.goal.goal_amount }}</v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Add Words</v-btn>
            <v-btn flat color="secondary">Change Goal</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title><h3 class="headline">Last Updated Project</h3></v-card-title>
          <v-card-text><h3>{{ latestProject.name }}</h3>a Novel</v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" v-if="latestProject.id">View Details</v-btn>
            <v-btn flat color="secondary">Start New Project</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title><h3 class="headline">Recent Work History</h3></v-card-title>
          <v-calendar class="pa-3"
            ref="calendar"
            v-model="calendarStart"
            :type="calendarType"
            :end="calendarEnd"
            color="primary">
          </v-calendar>
          <v-card-actions>
            <v-btn flat icon color="primary"
              @click="$refs.calendar.prev()">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat icon color="primary"
              @click="$refs.calendar.next()">
              <v-icon>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <b-container class="col-sm-12 col-lg-8">
    <b-row>
      <b-col>
        <h3>Welcome back, {{ this.$auth.user.given_name }}!</h3>
      </b-col>
    </b-row>
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
    </b-row>
    <update-goal />
    <work-goal :goal.sync="goal" v-on:update:amount="goal.goal_amount = $event" />
  </b-container> -->
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'
import WorkGoal from '../components/WorkGoal'
import WorkCalendar from '@/components/WorkCalendar'
import { format, startOfMonth, endOfMonth } from 'date-fns'

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
      },
      calendarType: 'month',
      calendarStart: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
      calendarEnd: format(endOfMonth(new Date()), 'YYYY-MM-DD')
    }
  },
  components: {
    UpdateGoal,
    WorkGoal,
    WorkCalendar
  },
  beforeCreate () {
    let todayDate = format(new Date(), 'YYYY-MM-DD')
    this.$axios.get('/goals/' + todayDate)
      .then(
        res => {
          this.goal = res.data
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
