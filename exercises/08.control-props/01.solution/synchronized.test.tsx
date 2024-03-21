import { expect, testStep } from '@kentcdodds/workshop-utils/test'
import { render, screen } from '@testing-library/react'
import { userEvent } from '#shared/user-event.cjs'
import { App } from './app.tsx'

await testStep('can render the app', () => {
	render(<App />)
})

const [toggleButton1, toggleButton2] = await testStep(
	'both buttons are rendered',
	() => {
		const buttons = screen.getAllByRole('switch')
		if (buttons.length < 2) {
			throw new Error('Could not find both toggle buttons')
		}
		return buttons as [HTMLElement, HTMLElement]
	},
)

await testStep('clicking the first button toggles both', async () => {
	await userEvent.click(toggleButton1)
	expect(toggleButton1).to.have.attr('aria-checked', 'true')
	expect(toggleButton2).to.have.attr('aria-checked', 'true')
})

await testStep('clicking the second button toggles both', async () => {
	await userEvent.click(toggleButton2)
	expect(toggleButton1).to.have.attr('aria-checked', 'false')
	expect(toggleButton2).to.have.attr('aria-checked', 'false')
})
