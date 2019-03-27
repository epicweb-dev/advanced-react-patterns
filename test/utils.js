import 'react-testing-library/cleanup-after-each'
import {render, fireEvent, wait} from 'react-testing-library'
import chalk from 'chalk'
import React from 'react'
import {
  findAllInRenderedTree,
  isCompositeComponentWithType,
} from 'react-dom/test-utils'
import {Switch} from '../src/switch'
import {extensions} from './extensions'

expect.extend(extensions)

const findSwitchInstances = rootInstance =>
  findAllInRenderedTree(rootInstance, c =>
    isCompositeComponentWithType(c, Switch),
  )

function validateSwitchInstance(switchInstance) {
  if (!switchInstance) {
    throw new Error(
      chalk.red(
        `Unable to find the Switch component. Make sure you're rendering that!`,
      ),
    )
  }
  try {
    expect(switchInstance.props).toMatchObject({
      on: expect.any(Boolean),
      onClick: expect.any(Function),
      // it can also have aria-pressed...
    })
  } catch (error) {
    const helpfulMessage = chalk.red(
      '🚨  The Switch component is not being passed the right props. 🚨',
    )
    error.message = `${helpfulMessage}\n\n${error.message}`
    throw error
  }
}

// this only exists so we can search for an instance of the Switch
// and make some assertions to give more helpful error messages.
class Root extends React.Component {
  render() {
    return this.props.children
  }
}

function renderToggle(ui) {
  let rootInstance
  let rootRef = instance => (rootInstance = instance)
  const utils = render(<Root ref={rootRef}>{ui}</Root>)
  const switchInstance = findSwitchInstances(rootInstance)[0]
  validateSwitchInstance(switchInstance)
  const toggleButton = utils.getByTestId('toggle-input')

  return {
    toggle: () => fireEvent.click(utils.getByTestId('toggle-input')),
    toggleButton,
    rootInstance,
    ...utils,
  }
}

export {render, fireEvent, wait, renderToggle}
