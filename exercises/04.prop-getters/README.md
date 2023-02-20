# Prop Collections and Getters

**One liner:** The Prop Collections and Getters Pattern allows your hook to
support common use cases for UI elements people build with your hook.

In typical UI components, you need to take accessibility into account. For a
button functioning as a toggle, it should have the `aria-checked` attribute set
to `true` or `false` if it's toggled on or off. In addition to remembering that,
people need to remember to also add the `onClick` handler to call `toggle`.

Lots of the reusable/flexible components and hooks that we'll create have some
common use-cases and it'd be cool if we could make it easier to use our
components and hooks the right way without requiring people to wire things up
for common use cases.

Here's a quick example:

```tsx
function useCounter() {
	const [count, setCount] = React.useState(initialCount)
	const increment = () => setCount(c => c + 1)
	return {
		count,
		increment,
		counterButtonProps: { children: count, onClick: increment },
	} // <-- this is the prop collection
}

function App() {
	const counter = useCounter()
	return <button {...counter.counterButtonProps} />
}
```

**Real World Projects that use this pattern:**

- [downshift](https://github.com/downshift-js/downshift) (uses prop getters)
- [react-table](https://github.com/tannerlinsley/react-table) (uses prop
  getters)
- [`@reach/tooltip`](https://reacttraining.com/reach-ui/tooltip) (uses prop
  collections)
