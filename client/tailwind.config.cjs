/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				// you can define some arbitrary names here and then use them in the className
				// for example, you can use the className "font-base" to apply the "Space Grotesk" font
				sans: ['Inter', 'sans-serif'],
				serif: ['ui-serif', 'Georgia'],
				base: ['"Space Grotesk"', 'sans-serif'],
				hero: ['"Climate Crisis"', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
