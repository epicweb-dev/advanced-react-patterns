/* eslint-disable */
const path = require('path')
const installDeps = require('./workshop-setup').installDeps

installDeps([path.resolve(__dirname, '..')]).then(
  () => {
    console.log('👍  all dependencies installed')
  },
  () => {
    // ignore, workshop-setup will log for us...
  },
)
