<template>
  <b-modal
    id="work-goal"
    ref="modal"
    :title="title"
    hide-footer
    class="text-left"
    @shown="onShown">
    <b-form @submit="onSubmit" @reset="onReset" class="w200">
      <!-- <b-form-group
        id="goal-type"
        label="Goal Type:"
        label-for="goal-type-select">
        <b-form-select
          id="goal-type-input"
          v-model="goalTypeId"
          required disabled>
          <template slot="first">
            <option :value="0">{{ this.newGoal.goal_type }}</option>
          </template>
        </b-form-select>
      </b-form-group> -->

      <b-form-group
        id="update-amount"
        label="Goal Amount:"
        label-for="update-amount-input">
        <b-form-input
          id="update-amount-input"
          ref="amount"
          type="number"
          v-model="newGoal.goal_amount"
          required
          placeholder="Project Goal">
        </b-form-input>
      </b-form-group>

      <b-row class="text-right">
        <b-col>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="warning">Cancel</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: ['goal'],
  data () {
    return {
      title: 'Set New Work Goal',
      goalTypeId: 0,
      addType: 0,
      newGoal: {}
    }
  },
  methods: {
    onShown () {
      this.newGoal = Object.assign({}, this.goal)
    },
    onSubmit (e) {
      e.preventDefault()

      let payload = {
        'user_id': this.$auth.userId,
        'goal_type': this.newGoal.goal_type,
        'goal_amount': this.newGoal.goal_amount
      }

      this.postGoal(payload)
    },
    onReset (e) {
      e.preventDefault()
      console.log(this.newGoal.goal_amount)
      this.closeModal(false)
    },
    postGoal (payload) {
      let userId = this.$auth.userId
      this.$axios.post('/goals?user_id=' + userId, payload).then(
        res => {
          if (res.status >= 200 && res.status < 300) {
            this.newGoal = Object.assign({}, res.data)
            this.closeModal(true)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    closeModal (success) {
      if (success) {
        this.$emit('update:goal', this.newGoal)
      }
      this.$refs.modal.hide()
    }
  },
  created () {
  }
}
</script>
