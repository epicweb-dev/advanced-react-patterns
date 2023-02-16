# Handle changing the `initialOn`

Actually, we're close, but it's not quite enough. What happens if the user of
your component changes the value of `initialOn` after your component is mounted?
Wouldn't that defeat the purpose of the whole "initial" part of our prop name?
How can you grab hold of the actual initial value and ignore any changes to that
prop?

💰 Hint, it's not so complicated that you need `useEffect`. You can do this with
`useRef` or `useState`.

## Files 🗃

<ul>
  <li className="flex gap-2">
    <span>modified:</span>
    <LaunchEditor workshopFile="exercises/05.state-initializer/01-02.problem/app.tsx">
      `app.tsx`
    </LaunchEditor>
  </li>
  <li className="flex gap-2">
    <span>modified:</span>
    <LaunchEditor workshopFile="exercises/05.state-initializer/01-02.problem/toggle.tsx">
      `toggle.tsx`
    </LaunchEditor>
  </li>
</ul>
