import * as React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react'
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

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
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
  await userEvent.type(taglineInput, testData.tagline)
  await userEvent.type(bioInput, testData.bio)

  // changed form enables submit and reset
  expect(submitButton).toHaveTextContent(/submit/i)
  expect(submitButton).not.toHaveAttribute('disabled')
  expect(resetButton).not.toHaveAttribute('disabled')

  const updatedUser = {...mockUser, ...testData}
  const defer = deferred()
  userClient.updateUser.mockImplementationOnce(() => defer.promise)

  await userEvent.click(submitButton)

  // pending form sets the submit button to ... and disables the submit and reset buttons
  expect(submitButton).toHaveTextContent(/\.\.\./i)
  expect(submitButton).toHaveAttribute('disabled')
  expect(resetButton).toHaveAttribute('disabled')
  // submitting the form invokes userClient.updateUser
  expect(userClient.updateUser).toHaveBeenCalledTimes(1)
  expect(userClient.updateUser).toHaveBeenCalledWith(mockUser, testData)
  userClient.updateUser.mockClear()

  // once the submit button changes from ... then we know the request is over
  defer.resolve(updatedUser)
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

test('reset works', async () => {
  const {resetButton, taglineInput} = renderApp()

  await userEvent.type(taglineInput, 'foo')
  await userEvent.click(resetButton)
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
  await userEvent.type(bioInput, testData.bio)
  const defer1 = deferred()
  const testErrorMessage = 'test error message'
  userClient.updateUser.mockImplementationOnce(() => defer1.promise)

  const updatedUser = {...mockUser, ...testData}

  await userEvent.click(submitButton)

  await act(async () => {
    defer1.reject({message: testErrorMessage})
    await defer1.promise.catch(() => {})
  })
  // await waitForLoading()

  expect(submitButton).toHaveTextContent(/try again/i)
  screen.getByText(testErrorMessage)
  expect(getDisplayData()).toEqual(mockUser)

  userClient.updateUser.mockClear()

  const defer2 = deferred()
  userClient.updateUser.mockImplementationOnce(() => defer2.promise)
  await userEvent.click(submitButton)

  defer2.resolve(updatedUser)
  await screen.findByRole('button', {name: /✔/})

  expect(resetButton).toHaveAttribute('disabled')

  // make sure the inputs have the right value
  expect(taglineInput.value).toBe(updatedUser.tagline)
  expect(bioInput.value).toBe(updatedUser.bio)

  // make sure the display data is correct
  expect(getDisplayData()).toEqual(updatedUser)
})
