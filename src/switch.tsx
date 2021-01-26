import './switch.styles.css'
import * as React from 'react'

// STOP! You should not have to change anything in this file to
// make it through the workshop. If tests are failing because of
// this switch not having properties set correctly, then the
// problem is probably in your implementation. Tip: Check
// your `render` method or the `getTogglerProps` method
// (if we've gotten to that part)

// this is here to fill in for the onChange handler
// we're not using onChange because it seems to behave
// differently in codesandbox and locally :shrug:
const noop = () => {}

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  on: boolean
  className?: string
  'aria-label'?: string
  onClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

class Switch extends React.Component<Props> {
  public render(): JSX.Element {
    const {
      on,
      className = '',
      'aria-label': ariaLabel,
      onClick,
      ...props
    } = this.props

    const btnClassName: string = [
      className,
      'toggle-btn',
      on ? 'toggle-btn-on' : 'toggle-btn-off',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <label aria-label={ariaLabel || 'Toggle'} style={{display: 'block'}}>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={noop}
          onClick={onClick}
          data-testid="toggle-input"
        />
        <span className={btnClassName} {...props} />
      </label>
    )
  }
}

export {Switch}
