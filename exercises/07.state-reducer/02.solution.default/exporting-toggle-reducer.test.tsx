import { expect, testStep } from '@kentcdodds/workshop-utils/test'
import { toggleReducer } from './toggle.tsx'

testStep('toggleReducer is exported', () => {
	expect(toggleReducer).to.be.a('function')
})
