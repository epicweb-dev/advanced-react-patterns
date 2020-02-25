import React from 'react'
import ReactDOM from 'react-dom'
import createWorkshopApp from './create-workshop-app'

const WorkshopApp = createWorkshopApp({
  getExerciseImport: id => () => import(`./exercises/${id}.js`),
  getFinalImport: id => () => import(`./exercises-final/${id}.js`),
  getExampleImport: id => () => import(`./examples/${id}.js`),
})

const rootEl = document.getElementById('⚛')
ReactDOM.render(<WorkshopApp />, rootEl)
