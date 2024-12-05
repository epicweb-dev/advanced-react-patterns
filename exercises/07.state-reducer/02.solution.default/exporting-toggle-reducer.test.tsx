import { expect, testStep } from '@epic-web/workshop-utils/test'
import { toggleReducer } from './toggle.tsx'

await testStep('toggleReducer is exported', () => {
	expect(toggleReducer).to.be.a('function')
})
