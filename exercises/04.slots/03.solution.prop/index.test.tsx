import { expect, testStep } from '@epic-web/workshop-utils/test'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { App } from './app.tsx'

await testStep('can render the app', () => {
	render(<App />)
})

const toggle = await testStep('Toggle is rendered', () =>
	screen.findByRole('switch', { name: /party mode/i }),
)

await testStep('Toggle is off to start', () =>
	expect(toggle).to.have.attr('aria-checked', 'false'),
)

await testStep(`Renders "Sad town 😭" when off`, () =>
	screen.findByText('Sad town 😭'),
)

await testStep(`Does not render "Let's party 🥳" when off`, () => {
	const textNode = screen.queryByText("Let's party 🥳")
	if (textNode) {
		expect(textNode).not.toBeVisible()
	}
})

await userEvent.click(toggle)

await testStep('Clicking the toggle turns it on', async () => {
	expect(toggle).to.have.attr('aria-checked', 'true')
})

await testStep(`Renders "Let's party 🥳" when on`, () =>
	screen.findByText("Let's party 🥳"),
)

await testStep('Does not render "Sad town 😭" when on', () => {
	const textNode = screen.queryByText('Sad town 😭')
	if (textNode) {
		expect(textNode).not.toBeVisible()
	}
})

const textField = await testStep('TextField is rendered', () =>
	screen.findByLabelText('Venue'),
)

await testStep('TextField label and input are associated', () => {
	const label = screen.getByText('Venue')
	expect(label).to.have.attr('for', textField.id)
})
