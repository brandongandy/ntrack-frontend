<template>
  <b-card :title="`Writing Streak: ${this.dayTitle()}`">

    <table class="table table-bordered" fixed>
      <thead>
        <tr>
          <th v-for="day in weekdays" :key="day.index">{{ day.day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week.index">
          <td v-for="day in week" :key="day.index" :class="styleDate(day)">{{ formatDate(day) }}</td>
        </tr>
      </tbody>
    </table>
  </b-card>
</template>

<script>
import { format, getDay, eachDay, startOfMonth, endOfMonth, subDays, addDays, isThisMonth } from 'date-fns'
export default {
  data () {
    return {
      loading: true,
      date: new Date(),
      weekdays: [
        { 'day': 'Sun' },
        { 'day': 'Mon' },
        { 'day': 'Tue' },
        { 'day': 'Wed' },
        { 'day': 'Thu' },
        { 'day': 'Fri' },
        { 'day': 'Sat' }
      ]
    }
  },
  computed: {
    firstDayIndex () {
      return getDay(startOfMonth(this.date))
    },
    days () {
      var days = eachDay(startOfMonth(this.date), endOfMonth(this.date))

      const SUNDAY = 0
      const SATURDAY = 6

      let firstDay = new Date(days[0])
      if (getDay(firstDay) !== SUNDAY) {
        do {
          firstDay = subDays(new Date(firstDay), 1)
          days.unshift(firstDay)
        } while (getDay(firstDay) !== SUNDAY)
      }

      let lastDay = new Date(days[days.length - 1])
      if (getDay(lastDay) !== SATURDAY) {
        do {
          lastDay = addDays(new Date(lastDay), 1)
          days.push(lastDay)
        } while (getDay(lastDay) !== SATURDAY)
      }
      return days
    },
    weeks () {
      let weeks = []
      let week = []

      for (let day of this.days) {
        week.push(day)
        if (week.length === 7) {
          weeks.push(week)
          week = []
        }
      }

      return weeks
    }
  },
  methods: {
    dayTitle (date = this.date) {
      return format(date, 'MMMM YYYY')
    },
    formatDate (date) {
      return format(date, 'DD')
    },
    styleDate (date) {
      if (isThisMonth(date)) {
        if (date < new Date('2019-03-12')) {
          return 'table-primary'
        }
        return 'table-light'
      } else {
        return 'table-secondary text-muted'
      }
    }
  }
}
</script>

<style>
.cal-ul {
  list-style-type: none;
  text-align: left;
}
.cal-li {
  display: inline-block;
  text-align: center;
  width: 13%;
  padding: 5px 2px;
}
</style>
