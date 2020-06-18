import React from 'react'
import {renderToggle, screen, userEvent} from '../../test/utils'
import App from '../final/05'
// import App from '../exercise/05'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  toggle()
  expect(toggleButton).toBeChecked()
  toggle()
  expect(toggleButton).not.toBeChecked()
})

test('can click too much', () => {
  const {toggleButton, toggle} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  toggle() // 1
  expect(toggleButton).toBeChecked()
  toggle() // 2
  expect(toggleButton).not.toBeChecked()
  expect(screen.getByTestId('click-count')).toHaveTextContent('2')
  toggle() // 3
  expect(toggleButton).toBeChecked()
  expect(screen.queryByText(/whoa/i)).not.toBeInTheDocument()
  toggle() // 4
  expect(toggleButton).toBeChecked()
  expect(screen.getByText(/whoa/i)).toBeInTheDocument()
  toggle() // 5: Whoa, too many
  expect(toggleButton).toBeChecked()
  toggle() // 6
  expect(toggleButton).toBeChecked()

  expect(screen.getByTestId('notice')).not.toBeNull()

  userEvent.click(screen.getByText('Reset'))
  expect(screen.queryByTestId('notice')).toBeNull()

  expect(toggleButton).not.toBeChecked()
  toggle()
  expect(toggleButton).toBeChecked()

  expect(screen.getByTestId('click-count')).toHaveTextContent('1')
})
