import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as userClient from '../user-client'
import {AuthProvider} from '../auth-context'
import App from '../final/01'
// import App from '../exercise/01'

jest.mock('../user-client', () => {
  return {updateUser: jest.fn(() => Promise.resolve())}
})

const mockUser = {username: 'jakiechan', tagline: '', bio: ''}

function renderApp() {
  const utils = render(
    <AuthProvider user={{user: mockUser}}>
      <App />
    </AuthProvider>,
  )

  const userDisplayPre = utils.container.querySelector('pre')
  return {
    ...utils,
    submitButton: screen.getByText(/✔/),
    resetButton: screen.getByText(/reset/i),
    taglineInput: screen.getByLabelText(/tagline/i),
    bioInput: screen.getByLabelText(/bio/i),
    waitForLoading: () =>
      waitForElementToBeRemoved(() => screen.getByText(/\.\.\./i)),
    userDisplayPre,
    getDisplayData: () => JSON.parse(userDisplayPre.textContent),
  }
}

test('happy path works', async () => {
  const {
    submitButton,
    resetButton,
    taglineInput,
    bioInput,
    waitForLoading,
    getDisplayData,
  } = renderApp()

  // unchanged form disables reset and submit buttons
  expect(submitButton).toHaveAttribute('disabled')
  expect(resetButton).toHaveAttribute('disabled')

  const testData = {...mockUser, tagline: 'test tagline', bio: 'test bio'}
  userEvent.type(taglineInput, testData.tagline)
  userEvent.type(bioInput, testData.bio)

  // changed form enables submit and reset
  expect(submitButton).toHaveTextContent(/submit/i)
  expect(submitButton).not.toHaveAttribute('disabled')
  expect(resetButton).not.toHaveAttribute('disabled')

  const updatedUser = {...mockUser, ...testData}
  userClient.updateUser.mockImplementationOnce(() =>
    Promise.resolve(updatedUser),
  )

  userEvent.click(submitButton)

  // pending form sets the submit button to ... and disables the submit and reset buttons
  expect(submitButton).toHaveTextContent(/\.\.\./i)
  expect(submitButton).toHaveAttribute('disabled')
  expect(resetButton).toHaveAttribute('disabled')
  // submitting the form invokes userClient.updateUser
  expect(userClient.updateUser).toHaveBeenCalledTimes(1)
  expect(userClient.updateUser).toHaveBeenCalledWith(mockUser, testData)
  userClient.updateUser.mockClear()

  // once the submit button changes from ... then we know the request is over
  await waitForLoading()

  // make sure all the text that should appear is there and the button state is correct
  expect(submitButton).toHaveAttribute('disabled')
  expect(submitButton).toHaveTextContent(/✔/)
  expect(resetButton).toHaveAttribute('disabled')

  // make sure the inputs have the right value
  expect(taglineInput.value).toBe(updatedUser.tagline)
  expect(bioInput.value).toBe(updatedUser.bio)

  // make sure the display data is correct
  expect(getDisplayData()).toEqual(updatedUser)
})

test('reset works', () => {
  const {resetButton, taglineInput} = renderApp()

  userEvent.type(taglineInput, 'foo')
  userEvent.click(resetButton)
  expect(taglineInput.value).toBe(mockUser.tagline)
})

test('failure works', async () => {
  const {
    submitButton,
    resetButton,
    taglineInput,
    bioInput,
    waitForLoading,
    getDisplayData,
  } = renderApp()

  const testData = {...mockUser, bio: 'test bio'}
  userEvent.type(bioInput, testData.bio)
  const testErrorMessage = 'test error message'
  userClient.updateUser.mockImplementationOnce(() =>
    Promise.reject({message: testErrorMessage}),
  )

  const updatedUser = {...mockUser, ...testData}

  userEvent.click(submitButton)

  await waitForLoading()

  expect(submitButton).toHaveTextContent(/try again/i)
  screen.getByText(testErrorMessage)
  expect(getDisplayData()).toEqual(mockUser)

  userClient.updateUser.mockClear()

  userClient.updateUser.mockImplementationOnce(() =>
    Promise.resolve(updatedUser),
  )
  userEvent.click(submitButton)

  await waitForLoading()

  expect(submitButton).toHaveTextContent(/✔/)
  expect(resetButton).toHaveAttribute('disabled')

  // make sure the inputs have the right value
  expect(taglineInput.value).toBe(updatedUser.tagline)
  expect(bioInput.value).toBe(updatedUser.bio)

  // make sure the display data is correct
  expect(getDisplayData()).toEqual(updatedUser)
})
