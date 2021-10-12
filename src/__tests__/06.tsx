import {renderToggle, screen, userEvent} from '../../test/utils'
import App from '../final/06'
// import App from '../exercise/06'

test('renders a toggle component', () => {
  const {getToggle, toggle} = renderToggle(<App />)
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
})

test('can click too much', () => {
  const {getToggle, toggle} = renderToggle(<App />)
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  toggle() // 1
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  toggle() // 2
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByTestId('click-count')).toHaveTextContent('2')
  toggle() // 3
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  expect(screen.queryByText(/whoa/i)).not.toBeInTheDocument()
  toggle() // 4
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText(/whoa/i)).toBeInTheDocument()
  toggle() // 5: Whoa, too many
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
  toggle() // 6
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')

  expect(screen.getByTestId('notice')).not.toBeNull()

  userEvent.click(screen.getByText('Reset'))
  expect(screen.queryByTestId('notice')).toBeNull()

  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')

  expect(screen.getByTestId('click-count')).toHaveTextContent('1')
})
