import { expect, testStep } from '@epic-web/workshop-utils/test'
import { screen, waitFor } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'
import '.'

const customButton = await testStep('Custom button is rendred', () =>
	screen.findByLabelText('custom-button'),
)
await testStep('Custom button has id attribute', async () => {
	expect(customButton).to.have.attr('id', 'custom-button-id')
})

const consoleInfo = console.info
const infos = []
console.info = (...args) => infos.push(args)

await userEvent.click(customButton)

await testStep(
	'Clicking the custom-button calls the onClick handler which calls console.info',
	() => waitFor(() => infos.length === 1),
)

console.info = consoleInfo
