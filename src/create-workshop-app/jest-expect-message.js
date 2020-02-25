// Huge thank you to https://github.com/mattphillips/jest-expect-message/blob/95e716c22348c9c30d932984cef36632b69b5d16/src/withMessage.js
import chalk from 'chalk'

// just made a few modifications for the workshop use case
const originalExpect = global.expect

class JestAssertionError extends Error {
  constructor(result, callsite) {
    super(result.message())
    this.matcherResult = result

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite)
    }
  }
}

const wrapMatcher = (matcher, customMessage) => {
  const newMatcher = (...args) => {
    try {
      return matcher(...args)
    } catch (error) {
      if (!error.matcherResult) {
        throw error
      }
      const {matcherResult} = error

      if (typeof customMessage !== 'string' || customMessage.length < 1) {
        throw new JestAssertionError(matcherResult, newMatcher)
      }

      const message = () =>
        '🚨  ' + chalk.red(customMessage) + '\n\n' + matcherResult.message()

      throw new JestAssertionError({...matcherResult, message}, newMatcher)
    }
  }
  return newMatcher
}

const wrapMatchers = (matchers, customMessage) => {
  return Object.keys(matchers).reduce((acc, name) => {
    const matcher = matchers[name]

    if (typeof matcher === 'function') {
      return {
        ...acc,
        [name]: wrapMatcher(matcher, customMessage),
      }
    }

    return {
      ...acc,
      [name]: wrapMatchers(matcher, customMessage), // recurse on .not/.resolves/.rejects
    }
  }, {})
}

// proxy the expect function
let expectProxy = Object.assign(
  (actual, customMessage) =>
    wrapMatchers(originalExpect(actual), customMessage), // partially apply expect to get all matchers and chain them
  originalExpect, // clone additional properties on expect
)

expectProxy.extend = o => {
  originalExpect.extend(o) // add new matchers to expect
  expectProxy = Object.assign(expectProxy, originalExpect) // clone new asymmetric matchers
}

global.expect = expectProxy
