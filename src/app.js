import React from 'react'
import {Route, Switch} from 'react-router'
import {BrowserRouter, Link} from 'react-router-dom'
import loadable from 'react-loadable'

const files = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]

const pages = files.reduce((p, filename, index, fullArray) => {
  const final = require(`./exercises-final/${filename}`)
  Object.assign(final, {
    previous: fullArray[index - 1],
    next: fullArray[index + 1],
    isolatedPath: `/isolated/exercises-final/${filename}`,
  })
  const exercise = require(`./exercises/${filename}`)
  Object.assign(exercise, {
    previous: fullArray[index - 1],
    next: fullArray[index + 1],
    isolatedPath: `/isolated/exercises/${filename}`,
  })
  p[filename] = {
    exercise,
    final,
    title: final.default.title,
  }
  return p
}, {})

const filesAndTitles = files.map(filename => ({
  title: pages[filename].title,
  filename,
}))

class ErrorCatcher extends React.Component {
  static getDerivedStateFromProps() {
    // if the props change then let's try rendering again...
    return {error: null}
  }
  state = {error: null}
  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({error})
  }
  render() {
    const {error} = this.state
    const {children, ...props} = this.props
    return (
      <div {...props}>
        {error
          ? 'There was an error. Edit the code and try again.'
          : children}
      </div>
    )
  }
}

function ComponentContainer({label, ...props}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2 style={{textAlign: 'center'}}>{label}</h2>
      <div
        style={{
          flex: 1,
          padding: 20,
          border: '1px solid',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ErrorCatcher {...props} />
      </div>
    </div>
  )
}

function ExerciseContainer({match}) {
  const {exerciseId} = match.params
  const {
    exercise: {default: Exercise},
    final: {default: Final},
  } = pages[exerciseId]
  return (
    <div
      style={{
        padding: 20,
        height: '100%',
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '30px 1fr 30px',
      }}
    >
      <h1 style={{gridColumn: 'span 2', textAlign: 'center'}}>
        {Final.title}
      </h1>
      <ComponentContainer
        label={<Link to={`/${exerciseId}/exercise`}>Exercise</Link>}
      >
        <Exercise />
      </ComponentContainer>
      <ComponentContainer
        label={<Link to={`/${exerciseId}/final`}>Final Version</Link>}
      >
        <Final />
      </ComponentContainer>
      <NavigationFooter exerciseId={exerciseId} type="page" />
    </div>
  )
}

function NavigationFooter({exerciseId, type}) {
  const current = pages[exerciseId]
  let suffix = ''
  let Usage = current.final
  if (type === 'exercise') {
    suffix = '/exercise'
    Usage = current.exercise
  } else if (type === 'final') {
    suffix = '/final'
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gridColumn: 'span 2',
      }}
    >
      <div style={{flex: 1}}>
        {Usage.previous ? (
          <Link to={`/${Usage.previous}${suffix}`}>
            {pages[Usage.previous].title}{' '}
            <span role="img" aria-label="previous">
              👈
            </span>
          </Link>
        ) : null}
      </div>
      <div style={{flex: 1, textAlign: 'center'}}>
        <Link to="/">Home</Link>
      </div>
      <div style={{flex: 1, textAlign: 'right'}}>
        {Usage.next ? (
          <Link to={`/${Usage.next}${suffix}`}>
            <span role="img" aria-label="next">
              👉
            </span>{' '}
            {pages[Usage.next].title}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function FullPage({type, match}) {
  const {exerciseId} = match.params
  const page = pages[exerciseId]
  const {default: Usage, isolatedPath} = pages[exerciseId][type]
  return (
    <div>
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link to={`/${exerciseId}`}>
          <span role="img" aria-label="back">
            👈
          </span>
          Exercise Page
        </Link>
        <Link to={isolatedPath}>isolated</Link>
      </div>
      <div style={{textAlign: 'center'}}>
        <h1>{page.title}</h1>
      </div>
      <div
        style={{
          flex: 1,
          padding: 20,
          margin: 20,
          border: '1px solid',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ErrorCatcher>
          <Usage />
        </ErrorCatcher>
      </div>
      <NavigationFooter exerciseId={exerciseId} type={type} />
    </div>
  )
}

class Isolated extends React.Component {
  Component = loadable({
    loader: () => {
      const {moduleName} = this.props.match.params
      return this.props.type === 'exercise'
        ? import(`./exercises/${moduleName}`)
        : this.props.type === 'final'
          ? import(`./exercises-final/${moduleName}`)
          : null
    },
    loading: () => <div>Loading...</div>,
  })
  render() {
    return (
      <div
        style={{
          padding: 30,
          height: '100%',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <this.Component />
        </div>
      </div>
    )
  }
}

function Home() {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
        Advanced React Component Patterns
      </h1>
      <div>
        {filesAndTitles.map(({title, filename}) => {
          return (
            <div key={filename} style={{margin: 10}}>
              {filename}
              {'. '}
              <Link to={`/${filename}`}>{title}</Link>{' '}
              <small>
                <Link to={`/${filename}/exercise`}>(exercise)</Link>{' '}
                <Link to={`/${filename}/final`}>(final)</Link>
              </small>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route
          path={`/:exerciseId`}
          exact={true}
          component={ExerciseContainer}
        />
        <Route
          path={`/:exerciseId/exercise`}
          render={props => <FullPage {...props} type="exercise" />}
          exact={true}
        />
        <Route
          path={`/:exerciseId/final`}
          render={props => <FullPage {...props} type="final" />}
          exact={true}
        />
        <Route
          path={`/isolated/exercises/:moduleName`}
          exact={true}
          render={props => <Isolated {...props} type="exercise" />}
        />
        <Route
          path={`/isolated/exercises-final/:moduleName`}
          exact={true}
          render={props => <Isolated {...props} type="final" />}
        />
        <Route
          render={() => (
            <div
              style={{
                height: '100%',
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                Sorry... nothing here. To open one of the exercises,
                go to <code>{`/exerciseId`}</code>, for example:{' '}
                <Link to="/01">
                  <code>{`/01`}</code>
                </Link>
              </div>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

export {App}

/* eslint
"no-unused-vars": [
  "warn",
  {
    "argsIgnorePattern": "^_.+|^ignore.+",
    "varsIgnorePattern": "^_.+|^ignore.+",
    "args": "after-used"
  }
]
 */
