import { waitFor, within, fireEvent } from '@testing-library/dom'
import { userEvent } from '~/shared/user-event.cjs'
import { expect, testStep } from '@kentcdodds/workshop-app/test'
import '.'

const screen = within(document.body)

const button = await testStep('The counter button should start at 0', () =>
	screen.findByRole('button', { name: '0' }),
)

const step = await testStep(
	'The spinbutton (Step) value should start at 1',
	async () => {
		const spinButton = await screen.findByRole('spinbutton', { name: /step/i })
		expect(spinButton).to.have.value('1')
		return spinButton
	},
)

await userEvent.click(button)
fireEvent.change(step, { target: { value: '2' } })
await userEvent.click(button)

await testStep(
	`Clicking the button then increasing the step before the timer runs out should make the count increase by the new step value.`,
	() =>
		waitFor(() => expect(button).to.have.text('2'), {
			timeout: 3100,
		}),
)
