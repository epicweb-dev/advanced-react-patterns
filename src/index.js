import React from 'react'
import ReactDOM from 'react-dom'
import preval from 'preval.macro'
import createWorkshopApp from '@kentcdodds/react-workshop-app'
import pkg from '../package.json'

const exerciseInfo = preval`module.exports = require('@kentcdodds/react-workshop-app/load-exercises')`

const WorkshopApp = createWorkshopApp({
  getExerciseImport: id => () => import(`./exercises/${id}.js`),
  getFinalImport: id => () => import(`./exercises-final/${id}.js`),
  getExampleImport: id => () => import(`./examples/${id}.js`),
  exerciseInfo,
  projectTitle: pkg.title,
})

const rootEl = document.getElementById('⚛')
ReactDOM.render(<WorkshopApp />, rootEl)
