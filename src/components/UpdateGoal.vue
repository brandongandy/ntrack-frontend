<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" small dark v-on="on">Add Words</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ this.title }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field box
                  label="Amount"
                  v-model="amount"
                  v-if="dialog"
                  :autofocus="true"
                  mask="#########" required></v-text-field>
                <v-select box
                  label="Project"
                  v-model="projectId"
                  :items="projectList"
                  item-text="name"
                  item-value="id"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" small dark flat @click="onReset">Cancel</v-btn>
          <v-btn color="success" small dark @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    project: {
      required: false,
      type: Object
    }
  },
  data () {
    return {
      dialog: false,
      amount: 0,
      addType: 0,
      canChangeProject: false,
      projectId: undefined
    }
  },
  computed: {
    ...mapGetters({
      projectList: 'project/getProjectList'
    }),
    title () {
      if (this.project) {
        return `Adding Words to ${this.project.name}`
      } else {
        return 'Add Words'
      }
    }
  },
  methods: {
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
      this.$axios.put('/entries', payload).then(
        res => {
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
