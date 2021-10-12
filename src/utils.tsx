import * as React from 'react'

// this needs to be put into an open source project on npm at some point...

const isProd = process.env.NODE_ENV === 'production'

const useControlPropWarnings = isProd
  ? () => {}
  : function useControlPropWarnings({
      controlPropValue,
      controlPropName,
      componentName,
      hasOnChange,
      readOnly,
      readOnlyProp,
      initialValueProp,
      onChangeProp,
    }: {
      controlPropValue: unknown
      controlPropName: string
      componentName: string
      hasOnChange: boolean
      readOnly?: boolean
      readOnlyProp: string
      initialValueProp: string
      onChangeProp: string
    }) {
      const hasWarnedReadOnlyRef = React.useRef(false)
      const hasWarnedSwitchRef = React.useRef(false)
      const isControlled = controlPropValue != null
      const {current: wasControlled} = React.useRef(isControlled)

      React.useEffect(() => {
        if (
          !hasWarnedReadOnlyRef.current &&
          !hasOnChange &&
          isControlled &&
          !readOnly
        ) {
          hasWarnedReadOnlyRef.current = true
          console.error(
            `The control prop \`${controlPropName}\` was provided to \`${componentName}\` without the prop \`${onChangeProp}\`. This will result in a read-only \`${controlPropName}\` value. If you want it to be mutable, use \`${initialValueProp}\`. Otherwise, set either \`${onChangeProp}\` or \`${readOnlyProp}\`.`,
          )
        }
      }, [
        componentName,
        controlPropName,
        isControlled,
        hasOnChange,
        readOnly,
        onChangeProp,
        initialValueProp,
        readOnlyProp,
      ])

      React.useEffect(() => {
        if (hasWarnedSwitchRef.current) return
        if (isControlled && !wasControlled) {
          hasWarnedSwitchRef.current = true
          console.error(
            `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
          )
        }
        if (!isControlled && wasControlled) {
          hasWarnedSwitchRef.current = true
          console.error(
            `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
          )
        }
      }, [componentName, controlPropName, isControlled, wasControlled])
    }

export {useControlPropWarnings}
