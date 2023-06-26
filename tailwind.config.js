/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			height: {
				'real-screen': 'calc(var(--vh) * 100)',
			},
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
				green050: '#35C910',
			},
			fontSize: {
				h1: [
					`${28 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				h2: [
					`${26 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				h3: [
					`${24 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				h4: [
					`${22 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				h5: [
					`${20 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				h6: [
					`${18 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				h7: [
					`${16 / 16}rem`,
					{
						fontWeight: '700',
						lineHeight: '150%',
					},
				],
				sh1: [
					`${18 / 16}rem`,
					{
						fontWeight: '500',
						lineHeight: '150%',
					},
				],
				sh3: [
					`${14 / 16}rem`,
					{
						fontWeight: '500',
						lineHeight: '150%',
					},
				],
				p1: [
					`${16 / 16}rem`,
					{
						fontWeight: '400',
						lineHeight: '150%',
					},
				],
				p2: [
					`${14 / 16}rem`,
					{
						fontWeight: '400',
						lineHeight: '150%',
					},
				],
				c: [
					`${12 / 16}rem`,
					{
						fontWeight: '400',
						lineHeight: '150%',
					},
				],
				button: [
					`${19 / 16}rem`,
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
