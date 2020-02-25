import React from 'react'
import preval from 'preval.macro'
import createWorkshopApp from './create-workshop-app'
import pkg from '../package.json'

export default createWorkshopApp({
  getExerciseImport: id => React.lazy(() => import(`./exercises/${id}.js`)),
  getFinalImport: id => React.lazy(() => import(`./exercises-final/${id}.js`)),
  getExampleImport: id => React.lazy(() => import(`./examples/${id}.js`)),
  exerciseInfo: preval`module.exports = require('./load-exercises')()`,
  pkg,
})
