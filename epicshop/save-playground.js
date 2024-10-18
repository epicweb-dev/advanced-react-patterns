import path from 'node:path'
import {
	getPlaygroundAppName,
	getAppByName,
} from '@epic-web/workshop-utils/apps.server'
import fsExtra from 'fs-extra'

const playgroundAppName = await getPlaygroundAppName()
const app = await getAppByName(playgroundAppName).catch(() => {})

if (!app) {
	throw new Error('❌ app not found')
}

const playgroundPath = path.join(process.cwd(), 'playground')
const doesPlaygroundExist = await fsExtra.exists(playgroundPath)
if (!doesPlaygroundExist) {
	throw new Error('❌  playground folder does not exist')
}

// create folder to store the playground
const [, moduleFolder, exerciseFolder] = app.relativePath.split('/')
const newFolderName = exerciseFolder.replace('problem', 'playground')
const storedPlaygroundsPath = path.join(
	process.cwd(),
	'stored-playgrounds',
	moduleFolder,
	newFolderName,
)
await fsExtra.ensureDir(storedPlaygroundsPath).catch(error => {
	console.error(error)
	throw new Error('❌  ensureDir failed')
})

console.log(
	'ℹ️  playground currently is set for exercise',
	app.relativePath.replace('exercises/', ''),
	`\n`,
)

// copy playground to solution
await fsExtra.copy(playgroundPath, storedPlaygroundsPath)

// update tsconfig path on tsconfig.json
const tsconfigPath = path.join(storedPlaygroundsPath, 'tsconfig.json')
const tsconfig = await fsExtra.readJson(tsconfigPath)
tsconfig.extends = '../../../tsconfig.json'
await fsExtra.writeJson(tsconfigPath, tsconfig, { spaces: 2 })

console.log('✅ playground saved on:', storedPlaygroundsPath)
