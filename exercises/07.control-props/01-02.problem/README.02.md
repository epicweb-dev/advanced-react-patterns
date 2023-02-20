# Control Prop Warnings

Take a look at the example in `./examples/warnings` (you can pull it up at
[/app/examples.warnings](http://localhost:3000/app/examples.warnings)).

Notice the warnings when you click the buttons. You should see the following
warnings all related to controlled inputs:

```
Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

```
Warning: A component is changing an uncontrolled input of type undefined to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
```

```
Warning: A component is changing a controlled input of type undefined to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
```

These runtime warnings are provided to us by React to help us avoid unexpected
behavior/mistakes.

We should issue the same warnings for people who misuse our controlled props:

1.  Passing `on` without `onChange`: This would result in a value that's
    read-only. There are times where that's desired, so we can add a `readOnly`
    prop to the `Toggle` component and if that's set to `true` then we don't
    need to warn the dev about this one. You can reproduce this one by removing
    the `onChange` handler from one of the two controlled `<Toggle />`
    components.
2.  Passing a value for `on` and later passing `undefined` or `null`: I honestly
    can't think of a situation where anyone would do this intentionally so it's
    probably a mistake. You can reproduce this in our example by changing
    `setBothOn(false)` to `setBothOn(null)` in the `handleResetClick` callback.
3.  Passing `undefined` or `null` for `on` and later passing a value: Similar to
    the second situation, this is most likely a mistake. You can reproduce this
    one in our example by changing `React.useState(false)` to
    `React.useState()`.

Because the specifics of logging the warning is complicated and not entirely
necessary for your learning (and it really should just be a library you install
anyway) I've given you a hook you can use called `useControlPropWarnings`:

```tsx
import { useControlPropWarnings } from '~/shared/utils'
```

You can pop open the `src/utils.tsx` file if you want to get an idea of how it
works.

🐨 So here's what you actually need to do:

1.  Import `useControlPropWarnings`
2.  Accept a new `readOnly` boolean prop to the `Toggle` component.
3.  Call `useControlPropWarnings` with the arguments it needs to know whether to
    log a message and the values to put into that message.

Then make sure you can reproduce all three warnings in the right scenarios.

A real-world component that does this is
[`@reach/listbox`](https://reacttraining.com/reach-ui/listbox/)

<section id="files" className="not-prose">
  <h2>Files</h2>

  <ul>
    <li data-state="modified">
      <span>modified</span>

      <LaunchEditor workshopFile="exercises/07.control-props/01-02.problem/toggle.tsx">
        <code>toggle.tsx</code>
      </LaunchEditor>
    </li>

  </ul>
</section>
