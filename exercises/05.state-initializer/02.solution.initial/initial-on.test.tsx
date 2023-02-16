import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './toggle'

await testStep('useToggle still maintains the old API and works', () => {
	const { result } = renderHook(() => useToggle())
	expect(result.current.on).to.be.false
	act(() => result.current.toggle())
	expect(result.current.on).to.be.true
	act(() => result.current.toggle())
	expect(result.current.on).to.be.false
})

await testStep(
	`The useToggle "on" state is not initialized to the initialOn value when it's set to true`,
	() => {
		const { result } = renderHook(() => useToggle({ initialOn: true }))
		expect(result.current.on).to.be.true
	},
)

await testStep(
	`The useToggle "on" state is not initialized to the initialOn value when it's set to false`,
	() => {
		const { result } = renderHook(() => useToggle({ initialOn: false }))
		expect(result.current.on).to.be.false
	},
)

await testStep(
	`The useToggle "on" state should not be changed when the user rerenders with a new initialOn value.`,
	() => {
		const { result, rerender } = renderHook(props => useToggle(props), {
			initialProps: { initialOn: true },
		})
		rerender({ initialOn: false })
		expect(result.current.on).to.be.true
	},
)
