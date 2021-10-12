import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/02'
// import App from '../exercise/02'

test('the user interface still works', () => {
  render(<App />)

  // verify the user info is in the nav
  const nav = screen.getByRole('navigation')
  const userSettingsLink = within(nav).getByRole('link', {
    name: /user settings/i,
  })
  const userAvatar = within(userSettingsLink).getByRole('img', {name: /kody/i})
  expect(userAvatar).toBeInTheDocument()

  // verify the user info is in the footer
  expect(screen.getByRole('contentinfo')).toHaveTextContent(
    `Don't have a good day–have a great day, Kody`,
  )

  // verify selecting a pokemon updates the detail info
  const pikachuButton = screen.getByRole('button', {name: /pikachu/i})
  userEvent.click(pikachuButton)
  expect(screen.getByText(/thunderbolt/i)).toBeInTheDocument()
})
