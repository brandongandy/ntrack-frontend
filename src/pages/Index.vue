<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <v-card>
          <v-card-title primary-title><h3 class="headline">Word Count Today</h3></v-card-title>
          <v-card-text><h3 class="display-1">{{ this.goal.words_today }}</h3> of {{ this.goal.goal_amount }}</v-card-text>
          <v-card-actions justify-end>
            <v-spacer></v-spacer>
            <change-goal />
            <update-goal />
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <v-card>
          <v-card-title primary-title><h3 class="headline">Last Updated Project</h3></v-card-title>
          <v-card-text><h3 class="display-1">{{ latestProject.name }}</h3>a Novel</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small dark :color="newProjectColor" to="/projects/new">New Project</v-btn>
            <v-btn small color="success" v-if="latestProject.id" @click="$router.push('/projects/view/' + latestProject.id)">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex md12 lg8>
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
            <v-btn flat icon color="success"
              @click="$refs.calendar.prev()">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat icon color="success"
              @click="$refs.calendar.next()">
              <v-icon>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UpdateGoal from '@/components/UpdateGoal'
import ChangeGoal from '@/components/ChangeGoal'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      msg: this.$auth.user.name,
      goal: {
        words_today: 0,
        goal_amount: 0
      },
      calendarType: 'month',
      calendarStart: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
      calendarEnd: format(endOfMonth(new Date()), 'YYYY-MM-DD')
    }
  },
  components: {
    UpdateGoal,
    ChangeGoal
  },
  computed: {
    ...mapGetters({
      projectList: 'project/getProjectList',
      latestProject: 'project/getLatestProject'
    }),
    newProjectColor () {
      return (this.latestProject.id ? 'blue-grey' : 'green')
    }
  },
  methods: {
    ...mapActions({
      getAllProjects: 'project/getAllProjects',
      getLatestProject: 'project/getLatestProject'
    })
  },
  created () {
    let todayDate = format(new Date(), 'YYYY-MM-DD')
    this.$axios.get('/goals/' + todayDate)
      .then(
        res => {
          this.goal = res.data
        },
        err => {
          console.log(err)
        }
      )

    this.getLatestProject()

    this.getAllProjects()
  }
}
</script>
