import { spawnSync } from 'child_process'
import { prompt } from 'inquirer'
import { globSync } from 'glob'

async function go() {
	const files = globSync('src/+(exercise|final)/*.+(js|ts|tsx)', {
		ignore: ['*.d.ts'],
	}).map(f => f.replace(/^src\//, ''))
	const { first } = await prompt([
		{
			name: 'first',
			message: `What's the first file`,
			type: 'list',
			choices: files,
		},
	])
	const { second } = await prompt([
		{
			name: 'second',
			message: `What's the second file`,
			type: 'list',
			choices: files.filter(f => f !== first),
		},
	])

	spawnSync(`git diff --no-index ./src/${first} ./src/${second}`, {
		shell: true,
		stdio: 'inherit',
	})
}

go()
