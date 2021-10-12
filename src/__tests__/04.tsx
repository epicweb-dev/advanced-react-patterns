import {renderToggle, screen, userEvent} from '../../test/utils'
import App from '../final/04'
// import App from '../exercise/04'

test('renders a toggle component', () => {
  const {getToggle, toggle} = renderToggle(<App />)
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
})

test('can also toggle with the custom button', () => {
  const {getToggle} = renderToggle(<App />)
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  userEvent.click(screen.getByLabelText('custom-button'))
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
})

// 💯 remove the `.skip` if you're working on the extra credit
test.skip('passes custom props to the custom-button', () => {
  const {getToggle} = renderToggle(<App />)
  const customButton = screen.getByLabelText('custom-button')
  expect(customButton.getAttribute('id')).toBe('custom-button-id')

  userEvent.click(customButton)

  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
})
