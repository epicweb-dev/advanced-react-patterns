import { expect, testStep } from '@epic-web/workshop-utils/test'
import { within } from '@testing-library/dom'
import { userEvent } from '#shared/user-event.cjs'
import '.'

const screen = within(document.body)

const nav = await testStep('The nav should be rendered', () =>
	screen.findByRole('navigation'),
)
const userSettingsLink = await testStep(
	'The user settings link should be rendered in the nav',
	() =>
		within(nav).findByRole('link', {
			description: /user settings/i,
		}),
)
await testStep(
	'The user avatar should be rendered in the user settings link',
	() => within(userSettingsLink).findByRole('img', { name: /kody/i }),
)

// verify the user info is in the footer
await testStep(
	'The greeting and username should be rendered in the footer',
	async () =>
		expect(await screen.findByRole('contentinfo')).to.have.text(
			`Don't have a good day–have a great day, Kody`,
		),
)

// verify selecting a sport updates the detail info
await testStep('Clicking a sport should update the detail info', async () => {
	const floaterButton = await screen.findByRole('button', { name: /floater/i })
	await userEvent.click(floaterButton)
	await screen.findByText(/space tornado/i)
})
