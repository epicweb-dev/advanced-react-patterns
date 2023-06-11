import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './toggle.tsx'

await testStep(
	result =>
		result.type === 'fail'
			? `
This is a common mistake. You probably set the "initialState" value to something like:

    const initialState = {on: initialOn}

But that won't work because as this test demonstrates, the user of your hook could change the value of that prop they give to you. But if this really is the *initial* value, shouldn't it be unchangeable? I think so! How can you make sure you keep track of the actual initial value and ignore any changes (hint, useRef or useState can do this).
`.trim()
			: `changing the initialOn prop should not change the on state`,
	() => {
		const { result, rerender } = renderHook(props => useToggle(props), {
			initialProps: { initialOn: true },
		})
		act(() => result.current.toggle())
		rerender({ initialOn: false })
		act(() => result.current.reset())
		expect(result.current.on).to.be.true
	},
)
