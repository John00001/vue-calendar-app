<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <div v-if="!event.edit">
      <span class="has-text-centered details">{{ event.details }}</span>
      <div class="has-text-centered icons">
        <i class="fa fa-pencil-square edit-icon" @click="editEvent(day.id, event.details)"></i>
        <i class="fa fa-trash-o delete-icon" @click="deleteEvent(day.id, event.details)"></i>
      </div>
    </div>
    <div v-if="event.edit">
      <input type="text" :placeholder="event.details" v-model="newDetails" ref="newDetailsInput"/>
      <div class="has-text-centered icons">
        <i class="fa fa-check" @click="updateEvent(day.id, newDetails)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/app/store";

export default {
  name: "CalendarEvent",
  props: ['event', 'day'],
  data() {
    return {
      newDetails: ''
    }
  },
  computed: {
    getEventBackgroundColor() {
      const colors = ['#f99', '#85d6ff', '#9f9'];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    }
  },
  methods: {
    editEvent(dayId, eventDetails) {
      store.editEvent(dayId, eventDetails);
      this.$nextTick(() => this.$refs.newDetailsInput.focus());
    },
    updateEvent(dayId, eventDetails) {
      store.updateEvent(dayId, eventDetails);
      this.newDetails = '';
    },
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails);
    }
  }
}
</script>

<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4c4c4c;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #fff;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>