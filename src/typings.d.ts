declare module '@kentcdodds/react-workshop-app/test-utils' {
  declare function alfredTip(
    shouldThrow: unknown | ((...args: unknown[]) => unknown),
    tip: string,
  ): void

  export {alfredTip}
}
