import { expect, testStep } from '@epic-web/workshop-utils/test'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { App } from './app.tsx'

await testStep('can render the app', () => {
	render(<App />)
})

await testStep('Toggle is rendered and initially on', async () => {
	const toggleElement = await screen.findByRole('switch')
	expect(toggleElement).toBeChecked()
})

await testStep('Toggle can be turned off', async () => {
	const toggleElement = await screen.findByRole('switch')
	await userEvent.click(toggleElement)
	expect(toggleElement).not.toBeChecked()
})

await testStep('Changing initialOn updates the initialOn option', async () => {
	const initialOnButton = await screen.findByRole('button', {
		name: /initialOn/i,
	})
	await userEvent.click(initialOnButton)
})

await testStep(
	'Clicking reset turns the toggle back on even though the initialOn option was changed to false',
	async () => {
		const resetButton = await screen.findByRole('button', { name: /reset/i })
		await userEvent.click(resetButton)
		const toggleElement = await screen.findByRole('switch')
		expect(
			toggleElement,
			'🚨 Did you forget to stablize the initalOn value?',
		).toBeChecked()
	},
)
