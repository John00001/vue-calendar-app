import {seedData} from "@/app/seed";

export const store = {
	state: {
		seedData
	},
	getActiveDay() {
		return this.state.seedData.find(day => day.active);
	},
	setActiveDay(dayId) {
		this.state.seedData.map((day) => {
			day.active = day.id === dayId ? true : false;
		});
	},
	submitEvent(eventDetails) {
		const activeDay = this.getActiveDay();
		activeDay.events.push({'details': eventDetails, 'edit': false});
	},
	editEvent(dayId, eventDetails) {
		this.resetEditOfAllEvents();
		const event = this.getEventObj(dayId, eventDetails);
		event.edit = true;
	},
	resetEditOfAllEvents() {
		this.state.seedData.map((day) => {
			day.events.map((event) => {
				event.edit = false;
			});
		});
	},
	updateEvent(dayId, eventDetails) {
		const event = this.getEventObj(dayId);

		event.edit = false;

		if (eventDetails !== '') {
			event.details = eventDetails;
		}
	},
	getEventObj(dayId, eventDetails) {
		const day = this.state.seedData.find(day => day.id === dayId);
		return eventDetails ?
			day.events.find(event => event.details === eventDetails) :
			day.events.find(event => event.edit);

	}
}