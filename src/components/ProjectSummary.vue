<template>
  <v-sheet class="pa-3 elevation-1">
    <v-layout row>
      <v-flex grow>
        <h2>{{ project.name }}</h2>
      </v-flex>
      <v-flex shrink>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small icon
              color="success" v-if="inList"
              v-on="on"
              @click="$router.push('project/' + project.id)">
              <v-icon>arrow_forward</v-icon>
            </v-btn>
          </template>
          <span>View Project</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small icon
              color="success" v-if="!inList"
              v-on="on"
              @click="$router.push('edit-project/' + project.id)"><v-icon>edit</v-icon></v-btn>
          </template>
          <span>Edit Project</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
    <p v-if="!inList">{{ project.goal_amount }} words before {{ project.due_date }}</p>
    <hr v-if="!inList" />
    <v-layout row>
      <v-flex>
        {{ project.word_count }} / {{ project.goal_amount }}
      </v-flex>
      <v-flex shrink>
        {{ this.percentFinished }}% finished
      </v-flex>
    </v-layout>
      <v-progress-linear v-model="percentFinished"></v-progress-linear>
  </v-sheet>
  <!-- <div>
    <b-row>
      <b-col lg="6" class="text-left">
        <h3>{{ project.name }}</h3>
      </b-col>
      <b-col lg="6" class="text-right">
        <span>
          <b-button size="sm" variant="success" v-if="inList" @click="$router.push('project/' + project.id)">View</b-button>
          <b-button size="sm" variant="success" v-else>Edit</b-button>
        </span>
      </b-col>
    </b-row>
    <p class="text-muted mt-3" v-if="!inList">{{ project.goal_amount }} words before {{ project.due_date }}</p>
    <hr v-if="!inList">
    <b-row>
      <b-col cols="6" class="text-left">{{ project.word_count }} / {{ project.goal_amount }}</b-col>
      <b-col cols="6" class="text-right">{{ this.percentFinished }}% finished</b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-progress :value="project.word_count" :max="project.goal_amount" />
      </b-col>
    </b-row>
    <b-row class="mt-1 text-right">
      <b-col>
        <b-button
          variant="success"
          size="sm"
          v-b-modal.update-goal
          v-if="!inList">
          Update
        </b-button>
      </b-col>
    </b-row>
  </div> -->
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
    }
  }
}
</script>
