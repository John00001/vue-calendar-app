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
	}
}