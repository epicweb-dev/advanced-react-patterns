# State Initializer

**One liner:** The state initializer pattern allows you to expose an API to
users to be able to reset your component to it's original state without having
to completely unmount and remount the component.

This is similar to `defaultValue` in HTML. Sometimes the consumer of your hook
or component wants to initialize the value of your state. The state initializer
pattern allows you to do that.

Take this for example:

```tsx lines=2,4
function Counter() {
	const [count, setCount] = React.useState(0)
	const increment = () => setCount(c => c + 1)
	const reset = () => setCount(0)
	return (
		<div>
			<button onClick={increment}>{count}</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}
```

So our component has a way to initialize it's state (to `0`) and it also
supports a way to reset the state to that initial value.

So what this pattern is for is to allow outside users of your component to
control that initial state value. For example. If someone wanted to start the
count off as `1` they might want to do this:

```tsx
<Counter initialCount={1} />
```

To support that we'd need to do this:

```tsx
function Counter({ initialCount = 0 }: { initialCount?: number }) {
	//              ^^^ accept the prop with a default value so it's optional
	const [count, setCount] = React.useState(initialCount) // <-- pass it to your state
	const increment = () => setCount(c => c + 1)
	const reset = () => setCount(initialCount) // <-- pass that initialCount value to the reset function
	return (
		<div>
			<button onClick={increment}>{count}</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}
```

And that's basically it for the pattern. It's not _quite_ perfect, but we'll
perfect it in the next step.

One other thing I want to call out is you can actually reset a component pretty
easily without any API at all. It's a built-in React API for all components: the
`key` prop. Simply provide a `key` and set that `key` prop to a new value any
time you want to re-initialize the component. This will unmount and remount the
component brand new. But there are situations where this is not what you want.
When you're finished with this exercise, compare your version with a version of
this component that uses the `key` method in
[`examples/resetting-via-key-prop`](http://localhost:3000/app/examples.resetting-via-key-prop).

📜 For a deeper dive into this, checkout my blog post
[The State Initializer Pattern](https://kentcdodds.com/blog/the-state-initializer-pattern).

**Real World Projects that use this pattern:**

- [downshift](https://github.com/downshift-js/downshift)
- [ReachUI](https://reach.tech)
