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
                  <v-btn icon small class="ma-0"
                    color="primary" dark v-if="inList"
                    v-on="on"
                    @click="$router.push('/projects/view/' + project.id)">
                    <v-icon>arrow_forward</v-icon>
                  </v-btn>
                </template>
                <span>View Project</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon small depressed class="ma-0"
                    color="accent" v-if="!inList"
                    v-on="on"
                    @click="$router.push('edit/' + project.id)">
                    <v-icon>settings</v-icon>
                  </v-btn>
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
      <v-card-actions v-if="!inList" class="mr-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" small>Add Words</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    project: Object,
    inList: Boolean
  },
  data () {
    return {}
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
