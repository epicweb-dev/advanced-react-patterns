import * as React from 'react'
import {renderToggle, screen, userEvent} from '../../test/utils'
import App from '../final/05'
// import App from '../exercise/05'

test('renders a toggle component', async () => {
  const {toggleButton, toggle} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  await toggle()
  expect(toggleButton).toBeChecked()
  await toggle()
  expect(toggleButton).not.toBeChecked()
})

test('can click too much', async () => {
  const {toggleButton, toggle} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  await toggle() // 1
  expect(toggleButton).toBeChecked()
  await toggle() // 2
  expect(toggleButton).not.toBeChecked()
  expect(screen.getByTestId('click-count')).toHaveTextContent('2')
  await toggle() // 3
  expect(toggleButton).toBeChecked()
  expect(screen.queryByText(/whoa/i)).not.toBeInTheDocument()
  await toggle() // 4
  expect(toggleButton).toBeChecked()
  expect(screen.getByText(/whoa/i)).toBeInTheDocument()
  await toggle() // 5: Whoa, too many
  expect(toggleButton).toBeChecked()
  await toggle() // 6
  expect(toggleButton).toBeChecked()

  expect(screen.getByTestId('notice')).not.toBeNull()

  await userEvent.click(screen.getByText('Reset'))
  expect(screen.queryByTestId('notice')).toBeNull()

  expect(toggleButton).not.toBeChecked()
  await toggle()
  expect(toggleButton).toBeChecked()

  expect(screen.getByTestId('click-count')).toHaveTextContent('1')
})
