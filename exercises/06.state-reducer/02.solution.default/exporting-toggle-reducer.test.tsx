import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { toggleReducer } from './toggle'

testStep('toggleReducer is exported', () => {
	expect(toggleReducer).to.be.a('function')
})
