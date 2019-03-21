<template>
  <b-container class="col-sm-12 col-lg-6">
    <b-row class="text-left">
      <b-col><h3>{{ title }}</h3></b-col>
    </b-row>

    <b-row align-h="center">
      <b-col class="text-left">
        <b-form
          @submit="onSubmit"
          @reset="onReset">
          <b-form-group
            id="project-name"
            label="Project Name:"
            label-for="project-name-input">
            <b-form-input
              id="project-name-input"
              type="text"
              v-model="newProjectForm.name"
              required
              placeholder="Enter project name">
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="project-type"
            label="Project Type:"
            label-for="project-type-select">
            <b-form-select
              id="project-type-select"
              v-model="newProjectForm.type"
              required
              :options="projectTypes">
              <template slot="first">
                <option :value="null" disabled>-- Choose a project type --</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="project-blurb"
            label="Premise / Blurb:"
            label-for="project-blurb-input">
            <b-form-textarea
              id="project-blurb-input"
              type="text"
              v-model="newProjectForm.blurb"
              placeholder="Write down the premise of your project or a short blurb about it. (Optional)"
              rows="2"
              max-rows="3">
            </b-form-textarea>
          </b-form-group>

          <b-form-group
            id="project-goal-type"
            label="Goal Type:"
            label-for="project-goal-type-input">
            <b-form-select
              id="project-goal-type-input"
              v-model="newProjectForm.goalType"
              required
              :options="projectTypes" disabled>
              <template slot="first">
                <option :value="null" disabled>Word Count</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="project-goal"
            label="Goal Amount:"
            label-for="project-goal-input">
            <b-form-input
              id="project-goal-input"
              type="number"
              v-model="newProjectForm.goalAmount"
              required
              placeholder="Project Goal">
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="project-due-date"
            label="Due Date:"
            label-for="project-due-date-input">
            <b-form-input
              id="project-due-date-input"
              type="date"
              v-model="newProjectForm.dueDate"
              required
              placeholder="Due Date">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" size="sm">Submit</b-button>
          <b-button type="reset" variant="warning" size="sm">Cancel</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      projectTypes: [
        { value: 'novel', text: 'Novel' },
        { value: 'article', text: 'Article / Essay' },
        { value: 'short', text: 'Short Story / Other' }
      ],
      newProjectForm: {
        name: '',
        type: null,
        blurb: '',
        goalType: null,
        goalAmount: 0,
        dueDate: ''
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()

      let project = {
        'user_id': this.userId,
        'name': this.newProjectForm.name,
        'type': this.newProjectForm.type,
        'blurb': this.newProjectForm.blurb,
        'goal_type': this.newProjectForm.goalType,
        'goal_amount': this.newProjectForm.goalAmount,
        'due_date': this.newProjectForm.dueDate
      }

      this.postProject(project)

      this.$router.push('/projects')
    },
    onReset (e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    postProject (payload) {
      console.log(payload)
      this.$axios.post('/projects', payload).then(
        res => {
          console.log('ok!')
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  computed: {
    userId: {
      get: function () {
        return JSON.parse(localStorage.getItem('user')).sub
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.title = 'Editing project: '
    } else {
      this.title = 'Start New Project'
    }
  }
}
</script>
