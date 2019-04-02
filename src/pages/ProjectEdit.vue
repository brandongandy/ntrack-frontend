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
              v-model="project.name"
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
              v-model="project.type"
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
              v-model="project.blurb"
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
              v-model="project.goalTypeId"
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
              v-model="project.goalAmount"
              required
              placeholder="Project Goal">
            </b-form-input>
          </b-form-group>

          <b-form-checkbox
            id="project-started-check"
            v-model="project.started"
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
              v-model="project.startAmount"
              :disabled="!project.started" />
          </b-form-group>

          <b-form-group
            id="project-due-date"
            label="Due Date:"
            label-for="project-due-date-input">
            <b-form-input
              id="project-due-date-input"
              type="date"
              v-model="project.dueDate"
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
      project: {
        id: null,
        name: '',
        type: 1,
        blurb: '',
        goalTypeId: 1,
        goalAmount: 0,
        started: false,
        startAmount: 0,
        startDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()

      let project = {
        'user_id': this.$auth.userId,
        'name': this.project.name,
        'project_type_id': this.project.type,
        'blurb': this.project.blurb,
        'goal_type_id': this.project.goalTypeId,
        'goal_amount': this.project.goalAmount,
        'start_amount': this.project.startAmount,
        'start_date': this.project.startDate,
        'due_date': this.project.dueDate,
        'last_update': this.project.lastUpdate,
        'is_finished': false
      }

      this.postProject(project)
    },
    onReset (e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    postProject (payload) {
      if (this.projectId) {
        payload.push({ 'id': this.projectId })
        this.$axios.put('/projects/' + payload.id, payload).then(
          res => {
            // do
          },
          err => {
            this.$alert.warning({ message: err })
          }
        )
      }
      this.$axios.post('/projects', payload).then(
        res => {
          this.$alert.success({ message: 'Project added!' })
          this.$router.push('/projects')
        },
        err => {
          this.$alert.warning({ message: err })
        }
      )
    }
  },
  computed: {
    projectId () {
      return this.$route.params.id
    }
  },
  created () {
    if (this.projectId) {
      this.title = 'Editing project: '
      this.$axios.get('/projects/' + this.projectId).then(
        res => {
          this.project = res.data
          this.title += `${this.project.name}`
        },
        err => {
          this.$alert.warning({ message: err })
        }
      )
    } else {
      this.title = 'Start New Project'
    }
  }
}
</script>
