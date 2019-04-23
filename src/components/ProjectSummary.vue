<template>
  <v-card class="mt-4">
      <v-card-title>
        <v-container fluid class="white--text card-header elevation-1" :class="determineHeaderBackground">
          <v-layout align-center>
            <v-flex>
              <span class="title">{{ project.name }}</span><v-spacer></v-spacer>
            </v-flex>
            <v-flex shrink class="pa-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                </template>
                <span>Edit Project Details</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap class="mx-2">
          <v-flex>
            <span class="subheading">
              {{ project.word_count }} of {{ project.goal_amount }} words
            </span>
          </v-flex>
          <v-flex shrink>
            <span class="subheading">
              {{ this.percentFinished }}% finished
            </span>
          </v-flex>
          <v-flex xs12>
            <v-progress-linear v-model="percentFinished"></v-progress-linear>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small class="ma-0"
          color="primary" dark v-if="inList"
          @click="$router.push('/projects/view/' + project.id)">View Project</v-btn>
        <v-btn small dark class="ma-0"
          color="blue-grey" v-if="!inList"
          @click="$router.push('/projects/edit/' + project.id)">
          Edit Project
        </v-btn>
        <update-goal v-if="!inList" :project="project" />
      </v-card-actions>
  </v-card>
</template>

<script>
import UpdateGoal from '@/components/UpdateGoal'
export default {
  props: {
    project: Object,
    inList: Boolean
  },
  data () {
    return {}
  },
  components: {
    UpdateGoal
  },
  computed: {
    percentFinished () {
      let percent = this.project.word_count / this.project.goal_amount * 100.00
      return percent.toFixed(0)
    },
    determineHeaderBackground () {
      if (this.inList) {
        return 'accent'
      } else {
        return 'primary'
      }
    }
  }
}
</script>
