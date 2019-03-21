<template>
  <b-modal
    id="work-goal"
    ref="modal"
    :title="title"
    hide-footer
    class="text-left">
    <b-form @submit="onSubmit" @reset="onReset" class="w200">
      <b-form-group
        id="goal-type"
        label="Goal Type:"
        label-for="goal-type-select">
        <b-form-select
          id="goal-type-input"
          v-model="goalTypeId"
          required disabled>
          <template slot="first">
            <option :value="0">Words Per Day</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group
        id="update-amount"
        label="Goal Amount:"
        label-for="update-amount-input">
        <b-form-input
          id="update-amount-input"
          ref="amount"
          type="number"
          v-model="amount"
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
  props: ['projectName'],
  data () {
    return {
      title: 'Set Work Goal',
      goalTypeId: 0,
      amount: 0,
      addType: 0
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()

      let payload = {
        'user_id': this.$auth.userId,
        'goal_type': this.goalTypeId,
        'goal_amount': this.amount
      }
      console.log(payload)
      this.changeGoal(payload)
    },
    onReset (e) {
      e.preventDefault()
      this.$refs.modal.hide()
    },
    changeGoal (payload) {

    }
  }
}
</script>
