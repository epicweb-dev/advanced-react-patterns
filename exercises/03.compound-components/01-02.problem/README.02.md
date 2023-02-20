# Compound Components Validation

Change <div
style={{display:'inline-block'}}><LaunchEditor workshopFile="exercises/03.compound-components/01-02.problem/app.tsx"><code>app.tsx</code></LaunchEditor></div>
to this (temporarily):

```javascript
import { ToggleButton } from './toggle'

export const App = () => <ToggleButton />
```

Why doesn't that work (it's not supposed to, but can you explain why)? Can you
figure out a way to give the developer a better error message that explains what
they're doing wrong and how to fix it?

🦺 Additionally, this is where we can make TypeScript happier (TypeScript knew
about the problem we'd run into in this step of the exercise!). Remember,
TypeScript isn't making your life terrible. It's just showing you how terrible
your life already is 😂 In this exercise, we're going to make our lives better.

🚨 NOTE: In this exercise, because we're testing what happens when things go
wrong, you'll see errors in the console when you've solved it correctly.

(You can go ahead and undo the change to `app.tsx` if you'd like. The tests will
let you know that you've gotten it right).

<section id="files" className="not-prose">
  <h2>Files</h2>

  <ul>
    <li data-state="modified">
      <span>modified</span>

      <InlineFile file="toggle.tsx" />
    </li>

  </ul>
</section>
