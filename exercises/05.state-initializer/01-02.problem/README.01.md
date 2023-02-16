# State Initializer

In this exercise, we want to do two things:

1.  Support initializing the `on` state via an `initialOn` option
2.  Support resetting the state to that initial value via a `reset` action in our
    reducer (yup, we've graduated from `useState` to `useReducer`).

This will require a number of changes all outlined for you in the exercise file.

You'll know that what you have is working when the toggle starts as "on" and
when you can click the "reset" button to change it from "off" to "on" (and the
tests will verify this is working for you as well).

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
    <LaunchEditor workshopFile="exercises/05.state-initializer/01-02.problem/index.tsx">
      `index.tsx`
    </LaunchEditor>
  </li>
  <li className="flex gap-2">
    <span>modified:</span>
    <LaunchEditor workshopFile="exercises/05.state-initializer/01-02.problem/toggle.tsx">
      `toggle.tsx`
    </LaunchEditor>
  </li>
</ul>
