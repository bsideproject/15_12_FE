/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				gray010: '#E7EAEE',
				gray020: '#DBDCDD',
				gray030: '#CECECE',
				gray070: '#5F6468',
				gray080: '#3B4248',
				gray090: '#26272F',
				blue030: '#B9CAEC',
				blue050: '#004AE4',
				blue060: '#0B40AE',
				orange050: '#EE6E38',
			},
			fontSize: {
				h1: [
					`${28 / 16}rem`,
					{
						fontWeight: '700',
					},
				],
				h2: [
					`${26 / 16}rem`,
					{
						fontWeight: '700',
					},
				],
				h3: [
					`${24 / 16}rem`,
					{
						fontWeight: '700',
					},
				],
				h4: [
					`${22 / 16}rem`,
					{
						fontWeight: '700',
					},
				],
				h5: [
					`${20 / 16}rem`,
					{
						fontWeight: '700',
					},
				],
				h6: [
					`${18 / 16}rem`,
					{
						fontWeight: '700',
					},
				],
				p1: [
					`${16 / 16}rem`,
					{
						fontWeight: '400',
					},
				],
				p2: [
					`${14 / 16}rem`,
					{
						fontWeight: '400',
					},
				],
				c: [
					`${12 / 16}rem`,
					{
						fontWeight: '400',
					},
				],
			},
		},
	},
	plugins: [],
};
