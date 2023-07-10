const localStorage = {
	set: (position: string) => window.localStorage.setItem('position', position),
	get: () => window.localStorage.getItem('position'),
};

export default localStorage;
