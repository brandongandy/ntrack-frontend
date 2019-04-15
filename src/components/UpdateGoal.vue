<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small dark v-on="on">Add Words</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ this.title }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-form v-model="valid">
                  <v-text-field box
                    label="Amount"
                    v-model="amount"
                    :rules="amountRules"
                    v-if="dialog"
                    :autofocus="true"
                    type="number"
                    required></v-text-field>
                  <v-select box
                    label="Project"
                    v-model="projectId"
                    :rules="projectRules"
                    :items="projectList"
                    item-text="name"
                    item-value="id" required
                    :disabled="canChangeProject"></v-select>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" small flat @click="onReset">Cancel</v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            small
            @click="onSubmit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    project: {
      required: false,
      type: Object
    }
  },
  data () {
    return {
      valid: true,
      dialog: false,
      amount: 0,
      id: null,
      amountRules: [
        amount => (!Number.isInteger(amount)) || 'Amount is not a valid number',
        amount => !!amount || 'Amount is not a valid number'
      ],
      projectRules: [
        proj => !!proj || 'Please select a project'
      ]
    }
  },
  computed: {
    ...mapGetters({
      projectList: 'project/getProjectList',
      goal: 'entry/getGoal'
    }),
    title () {
      if (this.project) {
        return `Adding Words to ${this.project.name}`
      } else {
        return 'Add Words'
      }
    },
    canChangeProject () {
      return (this.project !== undefined)
    },
    projectId: {
      get () {
        if (this.project) {
          return this.project.id
        } else {
          return this.id
        }
      },
      set (val) {
        this.id = val
      }
    }
  },
  methods: {
    ...mapActions({
      setGoal: 'entry/setGoal',
      getLatestProject: 'project/getLatestProject'
    }),
    onSubmit (e) {
      e.preventDefault()

      let payload = {
        'user_id': this.$auth.userId,
        'project_id': this.projectId,
        'amount': this.amount,
        'add_type': this.addType,
        'work_date': new Date().toISOString()
      }

      this.postWork(payload)
    },
    onReset (e) {
      e.preventDefault()
      this.projectId = null
      this.amount = 0
      this.dialog = false
    },
    postWork (payload) {
      this.$axios.put('/entries/', payload).then(
        res => {
          var newGoalObj = {
            words_today: this.goal.words_today + res.data.amount,
            goal_amount: this.goal.goal_amount
          }
          this.setGoal(newGoalObj)
          this.getLatestProject()

          this.projectId = null
          this.amount = 0
          this.dialog = false
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>
