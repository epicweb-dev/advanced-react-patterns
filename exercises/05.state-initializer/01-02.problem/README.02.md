# Handle changing the `initialOn`

Actually, we're close, but it's not quite enough. What happens if the user of
your component changes the value of `initialOn` after your component is mounted?
Wouldn't that defeat the purpose of the whole "initial" part of our prop name?
How can you grab hold of the actual initial value and ignore any changes to that
prop?

💰 Hint, it's not so complicated that you need `useEffect`. You can do this with
`useRef` or `useState`.

<section id="files" className="not-prose">
  <h2>Files</h2>

  <ul>
    <li data-state="modified">
      <span>modified</span>

      <LaunchEditor workshopFile="exercises/05.state-initializer/01-02.problem/app.tsx">
        <code>app.tsx</code>
      </LaunchEditor>
    </li>

    <li data-state="modified">
      <span>modified</span>

      <LaunchEditor workshopFile="exercises/05.state-initializer/01-02.problem/toggle.tsx">
        <code>toggle.tsx</code>
      </LaunchEditor>
    </li>

  </ul>
</section>
