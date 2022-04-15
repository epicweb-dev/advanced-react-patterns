import * as React from 'react'
import {renderToggle} from '../../test/utils'
import App from '../final/03'
// import App from '../exercise/03'

test('renders a toggle component', async () => {
  const {toggleButton, toggle, container} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
  await toggle()
  expect(toggleButton).toBeChecked()
  expect(container.textContent).toMatch('The button is on')
  expect(container.textContent).not.toMatch('The button is off')
  await toggle()
  expect(toggleButton).not.toBeChecked()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
})
