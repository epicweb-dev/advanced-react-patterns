import React from 'react'
import chalk from 'chalk'
import {renderToggle, render} from '../../test/utils'
import Usage, {withToggle} from '../exercises-final/12'
// import Usage, {withToggle} from '../exercises/12'

test('renders a toggle component', () => {
  const handleToggle = jest.fn()
  const {toggleButton, toggle, container} = renderToggle(
    <Usage onToggle={handleToggle} />,
  )
  expect(toggleButton).toBeOff()
  expect(container).toHaveTextContent('The button is off')
  toggle()
  expect(toggleButton).toBeOn()
  expect(container).toHaveTextContent('The button is on')
  expect(handleToggle).toHaveBeenCalledTimes(1)
  expect(handleToggle).toHaveBeenCalledWith(true)
})

test('forwards refs properly React.forwardRef', () => {
  class MyComp extends React.Component {
    instanceProp = true
    render() {
      return <div />
    }
  }
  const Wrapper = withToggle(MyComp)
  const myRef = React.createRef()
  render(<Wrapper ref={myRef} />)
  try {
    expect(myRef.current.instanceProp).toBe(true)
  } catch (error) {
    const helpfulMessage = chalk.red(
      `🚨  Make sure you're using React.forwardRef and returning the component that gives you!  🚨`,
    )
    error.message = `${helpfulMessage}\n\n${error.message}`
    throw error
  }
})

test('provides a good displayName', () => {
  const MyComp = () => null
  const Wrapper = withToggle(MyComp)
  try {
    expect(Wrapper.render.displayName).toBe('withToggle(MyComp)')
  } catch (error) {
    const helpfulMessage = chalk.red(
      `🚨  Make sure you're adding the displayName property to the component that is being returned.  🚨`,
    )
    error.message = `${helpfulMessage}\n\n${error.message}`
    throw error
  }
})

test('handles static properties', () => {
  const MyComp = withToggle(
    class extends React.Component {
      static MyDiv = () => <div>my div</div>
      render() {
        return <MyComp.MyDiv />
      }
    },
  )
  const Wrapper = withToggle(MyComp)
  try {
    render(<Wrapper />)
  } catch (error) {
    const helpfulMessage = chalk.red(
      `🚨  Make sure you're using hoistNonReactStatics on the component that's being returned  🚨`,
    )
    error.message = `${helpfulMessage}\n\n${error.message}`
    throw error
  }
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react%20patterns&e=12&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
