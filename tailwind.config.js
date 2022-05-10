module.exports = {
	darkMode: false, // or 'media' or 'class'
	content: ['./src/index.html', './src/**/*.vue', './src/mixins/*.mixin.ts'],
	theme: {
		extend: {
			borderWidth: {
				3: '3px'
			},
			colors: {
				white: '#fdfdfd',
				primary: {
					100: '#ecd47f',
					200: '#e1ba32',
					300: '#ddb119',
					400: '#f7bf00',
					500: '#daa900',
					700: '#c49800',
					800: '#684F1D',
					900: '#453411'
				}
			},
			width: {
				96: '24rem',
				112: '28rem',
				128: '32rem',
				144: '36rem',
				160: '40rem'
			},
			height: {
				96: '24rem',
				112: '28rem',
				128: '32rem',
				144: '36rem',
				160: '40rem'
			},
			minHeight: {
				10: '2.5rem'
			},
			maxHeight: {
				'5/6': '83%'
			},
			fontSize: {
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
				'10xl': '8rem'
			}
		}
	},
	variants: {
		visibility: ['group-hover'],
		extend: {
			borderWidth: ['first', 'last'],
			margin: ['last']
		},
		padding: ['responsive', 'first', 'hover', 'focus', 'last'],
		background: ['hover']
	},
	plugins: [],
	safelist: [
		{
			pattern: /^((xs|sm|md|lg|xl):)*w-/
		}
	]
};
