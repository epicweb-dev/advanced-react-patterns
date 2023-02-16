# Prop Getters

Uh oh! Someone wants to use our `togglerProps` object, but they need to apply
their own `onClick` handler! Try doing that by updating the `App` component to
this:

```javascript
function App() {
  const { on, togglerProps } = useToggle();
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button
        aria-label="custom-button"
        {...togglerProps}
        onClick={() => console.info("onButtonClick")}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}
```

I want both the toggle to work as well as the log. Does that work? Why not? Can
you change it to make it work?

What if we change the API slightly so that instead of having an object of props,
we call a function to get the props. Then we can pass that function the props we
want applied and that function will be responsible for composing the props
together.

Let's try that. Update the `App` component to this:

```javascript
function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}
```

See if you can make that API work.

🦺 The types for the argument to the `getTogglerProps` component might be a bit
tricky, so here's a little tip, you can get the `onClick` prop from:
`React.DOMAttributes<HTMLButtonElement>['onClick']`.

## Files 🗃

<ul>
  <li className="flex gap-2">
    <span>modified:</span>
    <LaunchEditor workshopFile="exercises/04.prop-getters/01-02.problem/app.tsx">
      `app.tsx`
    </LaunchEditor>
  </li>
  <li className="flex gap-2">
    <span>modified:</span>
    <LaunchEditor workshopFile="exercises/04.prop-getters/01-02.problem/toggle.tsx">
      `toggle.tsx`
    </LaunchEditor>
  </li>
</ul>
