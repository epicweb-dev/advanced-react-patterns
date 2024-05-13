import { expect, testStep } from '@epic-web/workshop-utils/test'
import { waitFor, within } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import '.'

const screen = within(document.body)
const button = await testStep('The counter button should start at 0', () =>
	screen.findByRole('button', { name: '0' }),
)

await testStep('The spinbutton (Step) value should start at 1', async () => {
	const spinButton = await screen.findByRole('spinbutton', { name: /step/i })
	expect(spinButton).to.have.value('1')
})

await userEvent.click(button)
await testStep(
	'The count should not change until the debounce period is over',
	() => {
		expect(button).to.have.text('0')
	},
)

await testStep(
	'After the debounce period the count should be updated by the step amount of 1',
	() =>
		waitFor(
			() => {
				expect(button).to.have.text('1')
			},
			{ timeout: 3100 },
		),
)
