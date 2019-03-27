/* eslint-disable */

var verifySystem = require('./workshop-setup').verifySystem

var verifyPromise = verifySystem([
  verifySystem.validators.node('>=8.9.4'),
  verifySystem.validators.npm('>=5.6.0')
])

verifyPromise.then(
  function() {
    // resolves if there are no errors
    console.log('🎉  Congrats! Your system is setup properly')
    console.log('You should be good to install and run things.')
  },
  function(error) {
    // rejects if there are errors
    console.error(error)
    console.info(
      "\nIf you don't care about these warnings, go " +
        'ahead and install dependencies with `node ./scripts/install`'
    )
    process.exitCode = 1
  }
)
