import { screen } from '@testing-library/dom'
import { userEvent } from '~/shared/user-event.cjs'
import { expect, testStep } from '@kentcdodds/workshop-app/test'

export async function verifySimpleToggleWithText() {
	const toggle = await testStep('Switch is rendered', () =>
		screen.findByRole('switch', { name: 'Toggle' }),
	)
	await testStep('Switch is off to start', () =>
		expect(toggle).to.have.attr('aria-checked', 'false'),
	)
	await testStep('Renders "The button is off"', () =>
		screen.findByText('The button is off'),
	)
	await testStep(
		'Does not render "The button is on"',
		() => expect(screen.queryByText('The button is on')).to.be.null,
	)
	await userEvent.click(toggle)
	await testStep(
		'Clicking the switch turns it on and the text updates',
		async () => {
			await screen.findByText('The button is on')
			expect(screen.queryByText('The button is off')).to.be.null
			expect(toggle).to.have.attr('aria-checked', 'true')
		},
	)

	await userEvent.click(toggle)
	await testStep(
		'Clicking the switch again turns it off and the text updates',
		async () => {
			await screen.findByText('The button is off')
			expect(screen.queryByText('The button is on')).to.be.null
			expect(toggle).to.have.attr('aria-checked', 'false')
		},
	)
}

export async function verifySimpleToggle() {
	const toggle = await testStep('Switch is rendered', () =>
		screen.findByRole('switch', { name: 'Toggle' }),
	)
	await testStep('Switch is off to start', () =>
		expect(toggle).to.have.attr('aria-checked', 'false'),
	)
	await userEvent.click(toggle)
	await testStep('Clicking the switch turns it on', async () => {
		expect(toggle).to.have.attr('aria-checked', 'true')
	})

	await userEvent.click(toggle)
	await testStep('Clicking the switch again turns it off', async () => {
		expect(toggle).to.have.attr('aria-checked', 'false')
	})
}

export async function verifySimpleToggleOnToStart() {
	const toggle = await testStep('Switch is rendered', () =>
		screen.findByRole('switch', { name: 'Toggle' }),
	)
	await testStep('Switch is on to start', () =>
		expect(toggle).to.have.attr('aria-checked', 'true'),
	)
	await userEvent.click(toggle)
	await testStep('Clicking the switch turns it off', async () => {
		expect(toggle).to.have.attr('aria-checked', 'false')
	})

	await userEvent.click(toggle)
	await testStep('Clicking the switch again turns it on', async () => {
		expect(toggle).to.have.attr('aria-checked', 'true')
	})
}

export async function verifyIsToggle(toggle: HTMLElement) {
	await testStep('Switch is off to start', () =>
		expect(toggle).to.have.attr('aria-checked', 'false'),
	)
	await userEvent.click(toggle)
	await testStep('Clicking the switch turns it on', async () => {
		expect(toggle).to.have.attr('aria-checked', 'true')
	})

	await userEvent.click(toggle)
	await testStep('Clicking the switch again turns it off', async () => {
		expect(toggle).to.have.attr('aria-checked', 'false')
	})
}
