const queryKeys = {
	activities: () => ['activities'],
	moodCheckin: (room: string) => ['moodCheckin', room],
	thankCircle: (room: string) => ['moodCheckin', room],
};

export default queryKeys;
