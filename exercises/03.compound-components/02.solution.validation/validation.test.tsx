import { render } from '@testing-library/react'
import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { ToggleButton } from './toggle'

await testStep(
	'ToggleButton should not render outside of a Toggle component',
	() => {
		const renderToggleButton = () => render(<ToggleButton />)
		expect(renderToggleButton).to.throw(/Toggle/i)
	},
)
