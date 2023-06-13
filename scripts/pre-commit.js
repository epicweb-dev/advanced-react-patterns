import { spawnSync } from 'child_process'
import os from 'os'

const { username } = os.userInfo()
if (username === 'kentcdodds') {
	const result = spawnSync('npm run validate', {
		stdio: 'inherit',
		shell: true,
	})

	if (result.status !== 0) {
		process.exit(result.status)
	}
}
