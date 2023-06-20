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
						lineHeight: `${42 / 16}rem`,
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
						lineHeight: `${36 / 16}rem`,
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
						lineHeight: `${22 / 16}rem`,
					},
				],
				h7: [
					`${16 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: `${19 / 16}rem`,
					},
				],
				sh1: [
					`${18 / 16}rem`,
					{
						fontWeight: '500',
						lineHeight: `${30 / 16}rem`,
					},
				],
				sh3: [
					`${14 / 16}rem`,
					{
						fontWeight: '500',
						lineHeight: `${17 / 16}rem`,
					},
				],
				p1: [
					`${16 / 16}rem`,
					{
						fontWeight: '400',
						lineHeight: `${24 / 16}rem`,
					},
				],
				p2: [
					`${14 / 16}rem`,
					{
						fontWeight: '400',
						lineHeight: `${17 / 16}rem`,
					},
				],
				c: [
					`${12 / 16}rem`,
					{
						fontWeight: '400',
					},
				],
				button: [
					`${20 / 16}rem`,
					{
						fontWeight: '800',
						lineHeight: `${54 / 16}rem`,
					},
				],
			},
		},
	},
	plugins: [],
};
