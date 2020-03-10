// React Context

import React from 'react'
import dequal from 'dequal'

// 🦉 in a real app, the context provider will be in a separate file from
// the consumers. But to keep things simple, we're putting this all in this
// one file and labeling the sections of code as well as imports/exports
// ./context/user-context.js

import * as userClient from '../user-client'
import {useAuth} from '../auth-context'

// 🐨 create your context here

// 💰 here's a reducer you can use
function userReducer(state, action) {
  switch (action.type) {
    case 'update': {
      return {user: action.updatedUser}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}) {
  // 🐨 get the user from the useAuth hook so you can use that as your initial
  // state for this context provider
  // 💰 const {user} = useAuth()

  // 🐨 useReducer here with the userReducer and initialize the state it with
  // the user you got from useAuth

  // 🐨 render state and dispatch as the values to a context provider here
  // 💰 make sure you don't forget to render {children} as well!
  return children
}

// ./context/user-context.js

// 🦉 here's where you'd normally export all this stuff
// export {UserProvider, UserContext}

// src/screens/user-profile.js

// 🦉 here's where you'd normally import all the stuff you need from the context
// import {UserProvider, UserContext} from './context/user-context'

function UserSettings() {
  // 💣 remove this stuff. It's just here to make it so the exercise page doesn't crash :)
  const [{user}, userDispatch] = [
    {user: {username: 'TODO', tagline: 'TODO', bio: 'TODO'}},
    () => {},
  ]
  // 🐨 get the user object and userDispatch function from context with React.useContext

  const [asyncState, asyncDispatch] = React.useReducer(
    (s, a) => ({...s, ...a}),
    {status: null, error: null},
  )
  const {error, status} = asyncState
  const isPending = status === 'pending'
  const isRejected = status === 'rejected'

  const [formState, setFormState] = React.useState(user)

  const isChanged = !dequal(user, formState)

  function handleChange(e) {
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  function handleSubmit(event) {
    event.preventDefault()

    asyncDispatch({status: 'pending'})
    userClient.updateUser(user, formState).then(
      updatedUser => {
        userDispatch({type: 'update', updatedUser})
        asyncDispatch({status: 'resolved'})
      },
      error => {
        asyncDispatch({status: 'rejected', error})
      },
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          style={{width: '100%'}}
        />
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          style={{width: '100%'}}
        />
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="bio">
          Biography
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          style={{width: '100%'}}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormState(user)
            asyncDispatch({status: null, error: null})
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={(!isChanged && !isRejected) || isPending}
        >
          {isPending
            ? '...'
            : isRejected
            ? '✖ Try again'
            : isChanged
            ? 'Submit'
            : '✔'}
        </button>
        {isRejected ? <pre style={{color: 'red'}}>{error.message} </pre> : null}
      </div>
    </form>
  )
}

function UserDataDisplay() {
  // 💣 remove this stuff. It's just here to make it so the exercise page doesn't crash :)
  const [{user}] = [
    {user: {username: 'TODO', tagline: 'TODO', bio: 'TODO'}},
    () => {},
  ]
  // 🐨 get the user object from context with React.useContext
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function Usage() {
  return (
    <div
      style={{
        height: 350,
        width: 300,
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        overflow: 'scroll',
      }}
    >
      {/* 🐨 wrap these in the UserProvider */}
      <UserSettings />
      <UserDataDisplay />
    </div>
  )
}

export default Usage

/*
eslint
  no-unused-vars: "off",
*/
