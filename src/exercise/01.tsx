// Latest Ref
// http://localhost:3000/isolated/exercise/01.tsx

import * as React from 'react'

function debounce<Callback extends (...args: Array<unknown>) => void>(
  fn: Callback,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<Callback>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

function useDebounce<Callback extends (...args: Array<unknown>) => unknown>(
  callback: Callback,
  delay: number,
) {
  // 🐨 create a latest ref (via useRef and useEffect) here

  // use the latest version of the callback here:
  // 💰 you'll need to pass an annonymous function to debounce. Do *not*
  // simply change this to `debounce(latestCallbackRef.current, delay)`
  // as that won't work. Can you think of why?
  return React.useMemo(() => debounce(callback, delay), [callback, delay])
}

function App() {
  const [step, setStep] = React.useState(1)
  const [count, setCount] = React.useState(0)

  // 🦉 feel free to swap these two implementations and see they don't make
  // any difference to the user experience
  // const increment = React.useCallback(() => setCount(c => c + step), [step])
  const increment = () => setCount(c => c + step)
  const debouncedIncrement = useDebounce(increment, 3000)
  return (
    <div>
      <div>
        <label>
          Step:{' '}
          <input
            type="number"
            step="1"
            min="1"
            max="10"
            onChange={e => setStep(Number(e.currentTarget.value))}
            defaultValue={step}
          />
        </label>
      </div>
      <button onClick={debouncedIncrement}>{count}</button>
    </div>
  )
}

export default App
