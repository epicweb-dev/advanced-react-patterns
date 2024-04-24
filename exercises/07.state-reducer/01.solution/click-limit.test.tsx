import { expect, testStep } from '@epic-web/workshop-utils/test'
import { render, screen } from '@testing-library/react'
import { userEvent } from '#shared/user-event.cjs'
import { App } from './app.tsx'

await testStep('can render the app', () => {
	render(<App />)
})

const toggle = screen.getByRole('switch')

await testStep('can toggle the switch up to four times', async () => {
	expect(toggle).to.have.attr('aria-checked', 'false')
	await userEvent.click(toggle) // 1
	expect(toggle).to.have.attr('aria-checked', 'true')
	await userEvent.click(toggle) // 2
	expect(toggle).to.have.attr('aria-checked', 'false')
	expect(screen.getByTestId('click-count')).to.have.text('Click count: 2')
	await userEvent.click(toggle) // 3
	expect(toggle).to.have.attr('aria-checked', 'true')
	expect(screen.queryByText(/whoa/i)).to.be.null
	await userEvent.click(toggle) // 4
	expect(toggle).to.have.attr('aria-checked', 'true')
})

await testStep('notice is visible after four clicks', () => {
	expect(screen.getByText(/whoa/i)).not.to.be.null
})

await testStep('cannot click beyond the limit of 4', async () => {
	await userEvent.click(toggle) // 5: Whoa, too many
	expect(toggle).to.have.attr('aria-checked', 'true')
	await userEvent.click(toggle) // 6
	expect(toggle).to.have.attr('aria-checked', 'true')
	expect(screen.getByTestId('notice')).not.to.be.null
})

await testStep('can reset the click count', async () => {
	await userEvent.click(screen.getByText('Reset'))
	expect(screen.queryByTestId('notice')).to.be.null
})

await testStep('can click again after reset', async () => {
	expect(toggle).to.have.attr('aria-checked', 'false')
	await userEvent.click(toggle)
	expect(toggle).to.have.attr('aria-checked', 'true')

	expect(screen.getByTestId('click-count')).to.have.text('Click count: 1')
})
