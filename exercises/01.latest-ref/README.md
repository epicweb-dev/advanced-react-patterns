# Latest Ref

**One liner:** The Latest Ref Pattern allows you to have a reference to the
latest value of a prop, state, or callback without needing to list it in a
dependency array when accessing it in a `useEffect`.

When React introduced hooks it did more than give us an excellent primitive with
super abstract-ability powers. It also changed an important default that results
in fewer bugs deployed to production. They changed how you access the latest
value of state and props.

Before, you would access these values via `this.state` and `this.props` meaning
that you'd always get the latest value of state or props in your functions.
Let's explore an example:

```tsx
class PokemonFeeder extends React.Component {
	state = { selectedPokemonFood: null }
	feedPokemon = async () => {
		const canEat = await this.props.pokemon.canEat(
			this.state.selectedPokemonFood,
		)
		if (canEat) {
			this.props.pokemon.eat(this.state.selectedPokemonFood)
		}
	}
	render() {
		return (
			<div>
				<PokemonFoodChooser
					onSelection={selectedPokemonFood =>
						this.setState({ selectedPokemonFood })
					}
				/>
				<button onClick={this.feedPokemon}>
					Feed {this.props.pokemon.name}
				</button>
			</div>
		)
	}
}
```

Think about that `feedPokemon` function for a moment... What kinds of bugs can
you spot with this implementation? Let me ask you a question. What would happen
if the `pokemon.canEat` function took a couple seconds to resolve? What could
the user do to cause a problem? If the user changed the `selectedPokemonFood`
what could happen? Yeah! You could check whether your pidgey can eat worms but
then actually feed it grass! Or what if while we're checking whether charizard
can eat some candy the props changed now we're withholding the candy from a
hungry pikachu! 😢

Can you imagine how we could side-step these issues? It's simple actually:

```ts
class PokemonFeeder extends React.Component {
	// ...
	feedPokemon = async () => {
		const { pokemon } = this.props
		const { selectedPokemonFood } = this.state
		const canEat = await pokemon.canEat(selectedPokemonFood)
		if (canEat) {
			pokemon.eat(selectedPokemonFood)
		}
	}
	// ...
}
```

The default led to bugs that were hard to catch because they often didn't happen
locally, but if there's one thing I know it's that everything that can happen,
users will make happen eventually 😅 And unfortunately these kinds of bugs are
also difficult to reproduce. So I made it a habit of doing this when I was
writing React class components back in the day and I was able to avoid this
problem altogether most of the time.

As mentioned earlier, React hooks flipped this default on its head and now every
function references the closure-version of props and state values rather than
accessing the latest value off some component instance. So now the kinds of bugs
you experience will happen during your local development. You won't be able to
avoid them, so you'll ship fewer (at least, that's been my experience).

So let's rewrite the example above with hooks:

```tsx
function PokemonFeeder({ pokemon }) {
	const [selectedPokemonFood, setSelectedPokemonFood] = React.useState(null)
	const feedPokemon = async () => {
		const canEat = await pokemon.canEat(selectedPokemonFood)
		if (canEat) {
			pokemon.eat(selectedPokemonFood)
		}
	}
	return (
		<div>
			<PokemonFoodChooser onSelection={food => setSelectedPokemonFood(food)} />
			<button onClick={feedPokemon}>Feed {pokemon.name}</button>
		</div>
	)
}
```

Alright, so that's the default (by that I mean it's the more natural and easier
way to write it). It avoids the bugs mentioned. But what if we _wanted_ the
behavior before? Could we make that work with hooks? Sure! We just need some way
to **ref**erence the latest version of a value. `useRef` to the rescue!

```tsx
function PokemonFeeder({ pokemon }) {
	const [selectedPokemonFood, setSelectedPokemonFood] = React.useState(null)
	const latestPokemonRef = React.useRef(pokemon)
	const latestSelectedPokemonFoodRef = React.useRef(selectedPokemonFood)

	// why is the useEffect necessary? Because side-effects run in the function
	// body of your component can lead to some pretty confusing bugs. Just keep
	// your function body free of side-effects and you'll be better off.
	React.useEffect(() => {
		latestPokemonRef.current = pokemon
		latestSelectedPokemonFoodRef.current = selectedPokemonFood
		// Wondering why we have no dependency list? Do we really need it?
		// Not really... So we don't bother.
	})

	const feedPokemon = async () => {
		const canEat = await latestPokemonRef.current.canEat(
			latestSelectedPokemonFoodRef.current,
		)
		if (canEat) {
			latestPokemonRef.current.eat(latestSelectedPokemonFoodRef.current)
		}
	}
	return (
		<div>
			<PokemonFoodChooser onSelection={food => setSelectedPokemonFood(food)} />
			<button onClick={feedPokemon}>Feed {pokemon.name}</button>
		</div>
	)
}
```

We've successfully simulated the class version of our original component. The
`ref` + `useEffect` there is what makes up the latest ref pattern.

Now why is this a desirable pattern you might ask? In the example above it looks
like you'd never want to deal with those bugs we talked about right. Well it
turns out there are some situations where you really _do_ want the latest
version of the callback. Use cases vary, but one popular library that uses this
pattern heavily is [`react-query`](https://react-query.tanstack.com). They use
this for query and mutation functions/configuration. One reason this is so
useful is because it means they can call your callback in a `useEffect` without
referencing it in the dependency list. For example:

```tsx
function useExampleOne(callback) {
	React.useEffect(() => {
		callback()
	}, [callback]) // <-- have to include the callback in the dep array
}

function useExampleTwo(callback) {
	const latestCallbackRef = React.useRef(callback)
	React.useEffect(() => {
		latestCallbackRef.current = callback
	})

	React.useEffect(() => {
		latestCallbackRef.current()
	}, []) // <-- don't have to include the callback in the dep array
}
```

It's important that you understand the trade-offs here! Remember, when we do
this we're going back to the class component default. So just think about the
unexpected behavior's you'll get when you switch the default like this.

📜 For more on this subject, read
[How React Uses Closures to Avoid Bugs](https://epicreact.dev/how-react-uses-closures-to-avoid-bugs).

📜 For more on the latest ref pattern, read
[The Latest Ref Pattern in React](https://epicreact.dev/the-latest-ref-pattern-in-react).

**Real World Projects that use this pattern:**

- [react-query](https://tanstack.com/query)
