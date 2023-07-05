const queryKeys = {
	activities: () => ['activities'],
	moodCheckin: (room: string) => ['moodCheckin', room],
};

export default queryKeys;
