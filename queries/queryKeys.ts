const queryKeys = {
	activities: () => ['activities'],
	speedGame: (room: string) => ['speedGame', room],
	moodCheckin: (room: string) => ['moodCheckin', room],
	thankCircle: (room: string) => ['thankCircle', room],
	mininetworking: (room: string) => ['mininetworking', room],
};

export default queryKeys;
