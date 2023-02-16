# State Initializer

In this exercise, we want to do two things:

1.  Support initializing the `on` state via an `initialOn` option
2.  Support resetting the state to that initial value via a `reset` action in
    our reducer (yup, we've graduated from `useState` to `useReducer`).

This will require a number of changes all outlined for you in the exercise file.

You'll know that what you have is working when the toggle starts as "on" and
when you can click the "reset" button to change it from "off" to "on" (and the
tests will verify this is working for you as well).

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
