import {renderToggle} from '../../test/utils'
import App from '../final/03'
// import App from '../exercise/03'

test('renders a toggle component', () => {
  const {toggle, getToggle, container} = renderToggle(<App />)
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  expect(container.textContent).toMatch('The button is on')
  expect(container.textContent).not.toMatch('The button is off')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
})
