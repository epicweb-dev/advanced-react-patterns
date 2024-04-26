/** @type {import('@types/eslint').Linter.Config} */
export default {
	files: ['**/*.js', '**/*.ts', '**/*.tsx'],
	languageOptions: { parser: await import('@typescript-eslint/parser') },
	plugins: {
		'@typescript-eslint': (await import('@typescript-eslint/eslint-plugin'))
			.default,
		'react-hooks': (await import('eslint-plugin-react-hooks')).default,
		import: (await import('eslint-plugin-import')).default,
	},
	rules: {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				disallowTypeAnnotations: true,
				fixStyle: 'inline-type-imports',
			},
		],
		'import/no-duplicates': ['warn', { 'prefer-inline': true }],
		'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
		'import/order': [
			'warn',
			{
				alphabetize: { order: 'asc', caseInsensitive: true },
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
			},
		],
	},
}
