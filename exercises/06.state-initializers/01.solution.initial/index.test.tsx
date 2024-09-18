import { expect, testStep } from '@epic-web/workshop-utils/test'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { App } from './app.tsx'

await testStep('can render the app', () => {
	render(<App />)
})

await testStep('Toggle is rendered and initially on', async () => {
	const toggleElement = await screen.findByRole('switch')
	expect(toggleElement).toHaveAttribute('aria-checked', 'true')
})

await testStep('Toggle can be turned off', async () => {
	const toggleElement = await screen.findByRole('switch')
	await userEvent.click(toggleElement)
	expect(toggleElement).toHaveAttribute('aria-checked', 'false')
})

await testStep('Clicking reset turns the toggle back on', async () => {
	const resetButton = await screen.findByRole('button', { name: /reset/i })
	await userEvent.click(resetButton)
	const toggleElement = await screen.findByRole('switch')
	expect(toggleElement).toHaveAttribute('aria-checked', 'true')
})
