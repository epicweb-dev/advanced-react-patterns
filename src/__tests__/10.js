import React from 'react'
import {
  findAllInRenderedTree,
  isCompositeComponentWithType,
} from 'react-dom/test-utils'
import chalk from 'chalk'
import {fireEvent, renderToggle} from '../../test/utils'
import Usage, {Toggle} from '../exercises-final/10'
// import Usage, {Toggle} from '../exercises/10'

const findToggleInstances = rootInstance =>
  findAllInRenderedTree(rootInstance, c =>
    isCompositeComponentWithType(c, Toggle),
  )

function validateToggleInstance(instance) {
  // validate the internal state of the toggle does not change
  // If it does change then you could trigger an unnecessary re-render
  try {
    expect(instance.state).toEqual({on: false})
    expect(instance.state).toEqual({on: false})
  } catch (error) {
    const helpfulMessage = chalk.red(
      `🚨  The toggle should not update its own state when it's controlled  🚨`,
    )
    error.message = `${helpfulMessage}\n\n${error.message}`
    throw error
  }
}

test('toggling either toggle toggles both', () => {
  const handleToggle = jest.fn()
  const {getAllByTestId, rootInstance} = renderToggle(
    <Usage onToggle={handleToggle} />,
  )
  const [toggleInstance1, toggleInstance2] = findToggleInstances(
    rootInstance,
  )
  const buttons = getAllByTestId('toggle-input')
  const [toggleButton1, toggleButton2] = buttons
  fireEvent.click(toggleButton1)
  expect(toggleButton1).toBeOn()
  expect(toggleButton2).toBeOn()

  validateToggleInstance(toggleInstance1)
  validateToggleInstance(toggleInstance2)

  fireEvent.click(toggleButton2)
  expect(toggleButton1).toBeOff()
  expect(toggleButton2).toBeOff()
})

test('toggle can still be uncontrolled', () => {
  const handleToggle = jest.fn()
  const {toggleButton, toggle} = renderToggle(
    <Toggle onToggle={handleToggle} />,
  )
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(handleToggle).toHaveBeenCalledTimes(1)
  expect(handleToggle).toHaveBeenCalledWith(true)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react%20patterns&e=10-primer&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
