module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'@typescript-eslint/indent': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: {
					max: 1
				},
				multiline: {
					max: 1
				}
			}
		]
	}
};
