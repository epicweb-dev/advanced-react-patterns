# Default State Reducer

Our `toggleReducer` is pretty simple, so it's not a huge pain for people to
implement their own. However, in a more realistic scenario, people may struggle
with having to basically re-implement our entire reducer which could be pretty
complex.

So for the extra credit, we're going to "export" the default reducer so people
can use that inside their own reducers as needed. In a real-world scenario, your
reusable hook will be in a separate file and you'll need to export the reducer.
Feel free to add a comment for that if you like (for example):

```ts
// export {useDownshift, downshiftReducer}

// immport {useDownshift, downshiftReducer} from 'downshift'
```

Go ahead and do this by changing the `toggleStateReducer` function inside the
`<App />` example to use the default reducer instead of having to re-implement
what to do when the action type is `'reset'`.

<section id="files" className="not-prose">
  <h2>Files</h2>

  <ul>
    <li data-state="modified">
      <span>modified</span>

      <LaunchEditor workshopFile="exercises/06.state-reducer/01-02.problem/app.tsx">
        <code>app.tsx</code>
      </LaunchEditor>
    </li>

    <li data-state="modified">
      <span>modified</span>

      <LaunchEditor workshopFile="exercises/06.state-reducer/01-02.problem/toggle.tsx">
        <code>toggle.tsx</code>
      </LaunchEditor>
    </li>

  </ul>
</section>
