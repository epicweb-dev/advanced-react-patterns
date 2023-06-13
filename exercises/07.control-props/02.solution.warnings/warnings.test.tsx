import { expect, testStep } from '@kentcdodds/workshop-app/test'
import { render, screen, cleanup } from '@testing-library/react'
import { userEvent } from '~/shared/user-event.cjs'
import React from 'react'
import { Toggle } from './toggle.tsx'

const originalConsoleError = console.error
let errors: Array<string> = []
console.error = (...args) => {
	const [first] = args
	if (typeof first === 'string') {
		errors.push(first)
	} else {
		// 🤷‍♂️
		originalConsoleError(...args)
	}
}

function assertHasError(error: RegExp) {
	if (!errors.some(e => error.test(e))) {
		throw new Error(`Expected error message to match ${error}`)
	}
}

render(<Toggle on={false} />)
expect(errors).to.have.length(1)

await testStep('<Toggle on={false} /> logs a readOnly error', async () => {
	await testStep(
		'<Toggle on={false} /> - The error message explains you can use a "readOnly" prop',
		() => assertHasError(/readOnly/i),
	)
	await testStep(
		'<Toggle on={false} /> - The error message explains you can use a "onChange" prop',
		() => assertHasError(/onChange/i),
	)
	await testStep(
		'<Toggle on={false} /> - The error message explains you can use an "initialOn" prop',
		() => assertHasError(/initialOn/i),
	)
})

cleanup()
errors = []

await testStep('no warning for controlled component with onChange prop', () => {
	render(<Toggle on={false} onChange={() => {}} />)
	expect(errors).to.have.length(0)
})

cleanup()
errors = []

await testStep(
	'no warning for controlled component with readOnly prop',
	async () => {
		render(<Toggle on={false} readOnly={true} />)
		await testStep('Make sure you forward the readOnly prop to the hook', () =>
			expect(errors).to.have.length(0),
		)
	},
)

cleanup()
errors = []

await testStep(
	'warning for changing from controlled to uncontrolled',
	async () => {
		function Example() {
			const [state, setState] = React.useState<boolean | undefined>(true)
			return <Toggle on={state} onChange={() => setState(undefined)} />
		}
		render(<Example />)
		await userEvent.click(screen.getByLabelText(/toggle/i))
		await testStep(
			`Make sure to explain that it's changing "from controlled to uncontrolled"`,
			() => assertHasError(/from controlled to uncontrolled/i),
		)
	},
)

cleanup()
errors = []

await testStep(
	'warning for changing from uncontrolled to controlled',
	async () => {
		function Example() {
			const [state, setState] = React.useState<boolean | undefined>(undefined)
			return <Toggle on={state} onChange={() => setState(true)} />
		}
		render(<Example />)
		await userEvent.click(screen.getByLabelText(/toggle/i))
		await testStep(
			`Make sure to explain that it's changing "from uncontrolled to controlled"`,
			() => assertHasError(/from uncontrolled to controlled/i),
		)
	},
)

cleanup()
errors = []

console.error = originalConsoleError
