import {matcherHint, printReceived, printExpected} from 'jest-matcher-utils'
import chalk from 'chalk'
import 'jest-dom/extend-expect'

const extensions = {
  toBeOn(toggleButton) {
    const on = toggleButton.checked
    if (on) {
      return {
        message: () =>
          [
            `${matcherHint('.not.toBeOn', 'received', '')} ${chalk.dim(
              '// it is not checked',
            )}`,
            `Expected the given element to not to be checked.`,
            '',
            `Because of this, ${chalk.bold(
              `the switch is in an ${chalk.underline('on')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: true,
      }
    } else {
      return {
        message: () =>
          [
            `${matcherHint('.toBeOn', 'received', '')} ${chalk.dim(
              '// it is checked',
            )}`,
            '',
            `Expected the given element to be checked.`,
            '',
            `Because of this, ${chalk.bold(
              `the switch is in an ${chalk.underline('off')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: false,
      }
    }
  },
  toBeOff(toggleButton) {
    const off = !toggleButton.checked
    if (off) {
      return {
        message: () =>
          [
            `${matcherHint('.not.toBeOff', 'received', '')} ${chalk.dim(
              '// it is checked',
            )}`,
            `Expected the given element to not be checked.`,
            '',
            `Because of this, ${chalk.bold(
              `the switch is in an ${chalk.underline('off')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: true,
      }
    } else {
      return {
        message: () =>
          [
            `${matcherHint('.toBeOff', 'received', '')} ${chalk.dim(
              '// it is unchecked',
            )}`,
            '',
            `Expected the given element to be unchecked.`,
            '',
            `Because of this, ${chalk.bold(
              `the switch is in an ${chalk.underline('on')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: false,
      }
    }
  },
}

export {extensions}
