import React from 'react'
import {renderToggle, render} from '../../test/utils'
import Usage from '../exercises-final/05'
// import Usage from '../exercises/05'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toEqual([['onToggle', true]])
})

// this test is using some serious witchcraft 🧙‍♀️
// don't write tests like this please.
// I'm just making sure that you're using a custom hook called useToggle
// but your apps should not have tests like this.
// That's an implementation detail... Read more: https://kcd.im/imp-deets
test('using a custom hook called useToggle', () => {
  const createElement = React.createElement
  let toggleFn
  React.createElement = (...args) => {
    if (args[0] && args[0].name === 'Toggle') {
      toggleFn = args[0]
    }
    return createElement(...args)
  }
  render(<Usage />)
  React.createElement = createElement
  try {
    expect(toggleFn.toString()).toContain('useToggle')
  } catch (error) {
    throw new Error(
      '🚨  The Toggle component that is rendered must call a hook called "useToggle" to get the "on" state and "toggle" functions',
    )
  }
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react%20hooks%20patterns&e=04&em=q%40q.nl
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
