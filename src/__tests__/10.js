import React from 'react'
import {fireEvent, renderToggle} from '../../test/utils'
import Usage, {Toggle} from '../exercises-final/10'
// import Usage, {Toggle} from '../exercises/10'

test('toggling either toggle toggles both', () => {
  const {getAllByTestId} = renderToggle(<Usage />)
  const buttons = getAllByTestId('toggle-input')
  const [toggleButton1, toggleButton2] = buttons
  fireEvent.click(toggleButton1)
  expect(toggleButton1).toBeOn()
  expect(toggleButton2).toBeOn()

  fireEvent.click(toggleButton2)
  expect(toggleButton1).toBeOff()
  expect(toggleButton2).toBeOff()
})

test('toggle can still be uncontrolled', () => {
  const {toggleButton, toggle} = renderToggle(<Toggle />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
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
