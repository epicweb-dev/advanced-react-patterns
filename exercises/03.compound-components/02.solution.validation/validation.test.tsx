import { render } from '@testing-library/react'
import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { ToggleButton, ToggleOff, ToggleOn } from './toggle'

const expectedErrorMessage =
	'Cannot find ToggleContext. All Toggle components must be rendered within <Toggle />'

window.addEventListener('error', event => {
	if (event.error.message.includes(expectedErrorMessage)) {
		event.preventDefault()
	}
})
// silence React error logging for tests that expect errors
console.error = () => {}

await testStep(
	'ToggleButton should throw an error when rendered outside a Toggle component',
	() => {
		const renderToggleButton = () => render(<ToggleButton />)
		expect(renderToggleButton).to.throw()
	},
)

await testStep(
	'ToggleOn should throw an error when rendered outside a Toggle component',
	() => {
		const renderToggleOn = () => render(<ToggleOn>toggle on</ToggleOn>)
		expect(renderToggleOn).to.throw()
	},
)

await testStep(
	'ToggleOff should throw an error when rendered outside a Toggle component',
	() => {
		const renderToggleOff = () => render(<ToggleOff>toggle off</ToggleOff>)
		expect(renderToggleOff).to.throw()
	},
)

await testStep(`The error thrown should say "${expectedErrorMessage}"`, () => {
	const renderToggleButton = () => render(<ToggleButton />)
	expect(renderToggleButton).to.throw(expectedErrorMessage)
})
