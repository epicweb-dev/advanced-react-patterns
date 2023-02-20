import { render } from '@testing-library/react'
import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { ToggleButton, ToggleOff, ToggleOn } from './toggle'

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

await testStep(
	'The error thrown should say something about rendering the ToggleButton within the Toggle component',
	() => {
		const renderToggleButton = () => render(<ToggleButton />)
		expect(renderToggleButton).to.throw(/Toggle/i)
	},
)
