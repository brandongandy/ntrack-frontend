<template>
  <div>
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
      <b-col cols="6" class="text-left">{{ project.start_amount }} / {{ project.goal_amount }}</b-col>
      <b-col cols="6" class="text-right">{{ this.percentFinished }}% finished</b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-progress :value="project.start_amount" :max="project.goal_amount" />
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
  </div>
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
      let percent = this.project.start_amount / this.project.goal_amount * 100.00
      return percent.toFixed(0)
    }
  }
}
</script>
