import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {renderHook, act} from '@testing-library/react-hooks'
import {useToggle} from '../final/05.extra-1'
// import {useToggle} from '../exercise/05'

test('useToggle still maintains the old API and works', () => {
  const {result} = renderHook(() => useToggle())
  expect(result.current.on).toBe(false)
  act(() => result.current.toggle())
  expect(result.current.on).toBe(true)
  act(() => result.current.toggle())
  expect(result.current.on).toBe(false)
})

test('initializes the state to the value given', () => {
  alfredTip(() => {
    const {result} = renderHook(() => useToggle({initialOn: true}))
    expect(result.current.on).toBe(true)
  }, `The useToggle "on" state is not initialized to the initialOn value when it's set to true`)

  alfredTip(() => {
    const {result} = renderHook(() => useToggle({initialOn: false}))
    expect(result.current.on).toBe(false)
  }, `The useToggle "on" state is not initialized to the initialOn value when it's set to false`)
})

test('changing the initialOn value does not change what the state value is', () => {
  const {result, rerender} = renderHook(props => useToggle(props), {
    initialProps: {initialOn: true},
  })
  rerender({initialOn: false})
  alfredTip(() => {
    expect(result.current.on).toBe(true)
  }, `The useToggle "on" state should not be changed when the user rerenders with a new initialOn value.`)
})

test('changing the initialOn value does not change what the state is reset to', () => {
  const {result, rerender} = renderHook(props => useToggle(props), {
    initialProps: {initialOn: true},
  })
  act(() => result.current.toggle())
  rerender({initialOn: false})
  act(() => result.current.reset())
  alfredTip(
    () => {
      expect(result.current.on).toBe(true)
    },
    `
This is a common mistake. You probably set the "initialState" value to something like:

    const initialState = {on: initialOn}

But that won't work because as this test demonstrates, the user of your hook could change the value of that prop they give to you. But if this really is the *initial* value, shouldn't it be unchangeable? I think so! How can you make sure you keep track of the actual initial value and ignore any changes (hint, useRef or useState can do this).
`.trim(),
  )
})
