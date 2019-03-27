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

          <!-- <b-form-group
            id="project-goal-type"
            label="Goal Type:"
            label-for="project-goal-type-input">
            <b-form-select
              id="project-goal-type-input"
              v-model="newProjectForm.goalTypeId"
              required
              :options="projectTypes" disabled>
              <template slot="first">
                <option :value="1" disabled>Word Count</option>
              </template>
            </b-form-select>
          </b-form-group> -->

          <b-form-group
            id="project-goal"
            label="Word Count Goal:"
            label-for="project-goal-input">
            <b-form-input
              id="project-goal-input"
              type="number"
              v-model="newProjectForm.goalAmount"
              required
              placeholder="Project Goal">
            </b-form-input>
          </b-form-group>

          <b-form-checkbox
            id="project-started-check"
            v-model="newProjectForm.started"
            :value="true"
            :unchecked-value="false"
            class="mb-2">
            Already Started?
          </b-form-checkbox>

          <b-form-group
            id="project-started-amount"
            label="Amount Written:"
            label-for="project-started-amount-input">
            <b-form-input
              id="project-started-amount-input"
              type="number"
              v-model="newProjectForm.startAmount"
              :disabled="!newProjectForm.started" />
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
        { value: 1, text: 'Novel' },
        { value: 2, text: 'Short Story / Other' },
        { value: 3, text: 'Article / Essay' }
      ],
      newProjectForm: {
        name: '',
        type: null,
        blurb: '',
        started: false,
        startAmount: 0,
        // goalTypeId: 1,
        goalAmount: 0,
        dueDate: ''
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()

      let dueDate = new Date(this.newProjectForm.dueDate)

      let project = {
        'user_id': this.userId,
        'name': this.newProjectForm.name,
        'project_type_id': this.newProjectForm.type,
        'blurb': this.newProjectForm.blurb,
        'goal_type_id': 1,
        'goal_amount': this.newProjectForm.goalAmount,
        'start_amount': this.newProjectForm.startAmount,
        'start_date': new Date().toISOString(),
        'due_date': dueDate,
        'last_update': new Date().toISOString(),
        'is_finished': false
      }

      this.postProject(project)
    },
    onReset (e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    postProject (payload) {
      console.log(payload)
      this.$axios.put('/projects', payload).then(
        res => {
          console.log('ok!')
          this.$router.push('/projects')
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
