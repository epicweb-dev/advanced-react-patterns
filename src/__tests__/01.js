import React from 'react'
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from 'react-testing-library'
import {AuthProvider} from '../auth-context'
import Usage from '../exercises-final/01'
// import Usage from '../exercises/01'
// NOTE: if you do the extra credit, make sure to enable the last test.

const mockUser = {username: 'jakiechan', tagline: '', bio: ''}

const mockFetchResponse = response =>
  window.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => response,
  })
const mockFetchRejection = rejection =>
  window.fetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => rejection,
  })

function renderUsage() {
  const utils = render(
    <AuthProvider user={{user: mockUser}}>
      <Usage />
    </AuthProvider>,
  )

  const userDisplayPre = utils.container.querySelector('pre')
  return {
    ...utils,
    submitButton: utils.getByText(/✔/),
    resetButton: utils.getByText(/reset/i),
    taglineInput: utils.getByLabelText(/tagline/i),
    bioInput: utils.getByLabelText(/bio/i),
    waitForLoading: () =>
      waitForElementToBeRemoved(() => utils.getByText(/\.\.\./i)),
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
  } = renderUsage()

  // unchanged form disables reset and submit buttons
  expect(submitButton).toHaveAttribute('disabled')
  expect(resetButton).toHaveAttribute('disabled')

  const testData = {...mockUser, tagline: 'test tagline', bio: 'test bio'}
  fireEvent.change(taglineInput, {target: {value: testData.tagline}})
  fireEvent.change(bioInput, {target: {value: testData.bio}})

  // changed form enables submit and reset
  expect(submitButton).toHaveTextContent(/submit/i)
  expect(submitButton).not.toHaveAttribute('disabled')
  expect(resetButton).not.toHaveAttribute('disabled')

  const updatedUser = {...mockUser, ...testData}
  mockFetchResponse({user: updatedUser})

  fireEvent.click(submitButton)

  // pending form sets the submit button to ... and disables the submit and reset buttons
  expect(submitButton).toHaveTextContent(/\.\.\./i)
  expect(submitButton).toHaveAttribute('disabled')
  expect(resetButton).toHaveAttribute('disabled')
  // submitting the form calls window.fetch
  expect(window.fetch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "/user/jakiechan",
        Object {
          "body": "{\\"username\\":\\"jakiechan\\",\\"tagline\\":\\"test tagline\\",\\"bio\\":\\"test bio\\"}",
          "method": "PUT",
        },
      ],
    ]
  `)
  window.fetch.mockClear()

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
  const {resetButton, taglineInput} = renderUsage()

  fireEvent.change(taglineInput, {target: {value: 'foo'}})
  fireEvent.click(resetButton)
  expect(taglineInput.value).toBe(mockUser.tagline)
})

test('failure works', async () => {
  const {
    getByText,
    submitButton,
    resetButton,
    taglineInput,
    bioInput,
    waitForLoading,
    getDisplayData,
  } = renderUsage()

  const testData = {...mockUser, bio: 'test bio'}
  fireEvent.change(bioInput, {target: {value: testData.bio}})
  const testErrorMessage = 'test error message'
  mockFetchRejection({message: testErrorMessage})

  const updatedUser = {...mockUser, ...testData}

  fireEvent.click(submitButton)

  await waitForLoading()

  expect(submitButton).toHaveTextContent(/try again/i)
  getByText(testErrorMessage)
  expect(getDisplayData()).toEqual(mockUser)

  window.fetch.mockClear()

  mockFetchResponse({user: updatedUser})
  fireEvent.click(submitButton)

  await waitForLoading()

  expect(submitButton).toHaveTextContent(/✔/)
  expect(resetButton).toHaveAttribute('disabled')

  // make sure the inputs have the right value
  expect(taglineInput.value).toBe(updatedUser.tagline)
  expect(bioInput.value).toBe(updatedUser.bio)

  // make sure the display data is correct
  expect(getDisplayData()).toEqual(updatedUser)
})

// enable this test if you're doing the extra credit about optimistic updates
test.skip('optimisitc updates works with failures', async () => {
  const {
    getByText,
    submitButton,
    resetButton,
    taglineInput,
    bioInput,
    waitForLoading,
    getDisplayData,
  } = renderUsage()

  const testData = {...mockUser, bio: 'test bio'}
  fireEvent.change(bioInput, {target: {value: testData.bio}})
  const testErrorMessage = 'test error message'
  mockFetchRejection({message: testErrorMessage})
  fireEvent.click(submitButton)

  const updatedUser = {...mockUser, ...testData}
  // this is the only real addition to the previous test
  expect(getDisplayData()).toEqual(updatedUser)

  await waitForLoading()

  expect(submitButton).toHaveTextContent(/try again/i)
  getByText(testErrorMessage)
  expect(getDisplayData()).toEqual(mockUser)

  window.fetch.mockClear()

  mockFetchResponse({user: updatedUser})
  fireEvent.click(submitButton)

  await waitForLoading()

  expect(submitButton).toHaveTextContent(/✔/)
  expect(resetButton).toHaveAttribute('disabled')

  // make sure the inputs have the right value
  expect(taglineInput.value).toBe(updatedUser.tagline)
  expect(bioInput.value).toBe(updatedUser.bio)

  // make sure the display data is correct
  expect(getDisplayData()).toEqual(updatedUser)
})
