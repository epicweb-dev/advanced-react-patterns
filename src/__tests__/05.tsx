import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {renderHook, act} from '@testing-library/react-hooks'
import {useToggle} from '../final/05'
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
