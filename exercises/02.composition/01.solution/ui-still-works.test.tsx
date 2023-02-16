import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { expect, testStep } from '@kentcdodds/workshop-app/test'
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

// verify selecting a pokemon updates the detail info
await testStep('Clicking a pokemon should update the detail info', async () => {
	const pikachuButton = await screen.findByRole('button', { name: /pikachu/i })
	await userEvent.click(pikachuButton)
	await screen.findByText(/thunderbolt/i)
})
