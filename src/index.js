import './hacks'
import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import preval from 'preval.macro'
import createWorkshopApp from './create-workshop-app'
import pkg from '../package.json'

const WorkshopApp = createWorkshopApp({
  getExerciseImport: id => React.lazy(() => import(`./exercises/${id}.js`)),
  getFinalImport: id => React.lazy(() => import(`./exercises-final/${id}.js`)),
  getExampleImport: id => React.lazy(() => import(`./examples/${id}.js`)),
  exerciseInfo: preval`module.exports = require('./load-exercises')()`,
  pkg,
})

const rootEl = document.getElementById('⚛')
ReactDOM.render(<WorkshopApp />, rootEl)
