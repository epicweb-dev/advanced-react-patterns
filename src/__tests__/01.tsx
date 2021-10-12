import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/01'
// import App from '../exercise/01'

beforeEach(() => {
  jest.useFakeTimers()
})

test('still functions as a counter', () => {
  render(<App />)
  alfredTip(
    () => {
      screen.getByRole('button', {name: '0'})
    },
    'Could not find the counter button. Make sure the counter starts at "0"',
    {displayEl: true},
  )

  alfredTip(
    () => {
      expect(screen.getByRole('spinbutton', {name: /step/i})).toHaveValue(1)
    },
    'The spinbutton (Step) value should start at 1',
    {displayEl: true},
  )

  const button = screen.getByRole('button', {name: '0'})
  userEvent.click(button)
  alfredTip(() => {
    expect(button).toHaveTextContent('0')
  }, 'The count was updated immediately after clicking. It should be debounced')

  act(() => {
    jest.runOnlyPendingTimers()
  })

  alfredTip(() => {
    expect(button).toHaveTextContent('1')
  }, 'After the debounce period the count should be updated by the step amount of 1')
})

test('changing the step before the timer is finished is taken into account', () => {
  render(<App />)
  const step = screen.getByRole('spinbutton', {name: /step/i})
  const button = screen.getByRole('button', {name: '0'})
  userEvent.click(button)
  userEvent.type(step, '2{arrowleft}{backspace}')
  userEvent.click(button)

  act(() => {
    jest.runOnlyPendingTimers()
  })

  alfredTip(
    () => {
      expect(button).toHaveTextContent('2')
    },
    error => {
      let originalErrorMessage = ''
      if (error instanceof Error) {
        originalErrorMessage = `\n\n${error.message}`
      }
      return `Clicking the button then increasing the step before the timer is out should make the count increase by the new step value.${originalErrorMessage}`
    },
  )
})
