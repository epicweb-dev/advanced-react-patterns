// React Context

import React from 'react'
import dequal from 'dequal'

// ./context/user-context.js

// 🐨 you're gonna need these, so just uncomment it now :)
// import * as userClient from '../user-client'
// import {useAuth} from '../auth-context'

// 🐨 create your context here

function UserProvider({children}) {
  // 🐨 get the user from the useAuth hook so you can use that as your initial
  // state for this context provider
  // 💰 const {user} = useAuth()

  // 🐨 useReducer here with a userReducer and initialize it with the user you
  // got from useAuth
  // 💰 the reducer should handle an action type called `update` which will be
  // dispatched in the `updateUser` helper below

  // 🐨 render state and dispatch as values to a context provider here
  // 💰 make sure you don't forget to render {children} as well!
  return children
}

// 🦉 You don't have to do this, but one good idea is to create a custom hook
// which retrieves the context value via React.useContext, then people can use
// your custom hook. If you want to try that, then go ahead and put it here.

// This is a utility function which accepts the reduer's dispatch function
// as well as the user and any updates. It's responsible for interacting with
// the userClient and the dispatch.
async function updateUser(dispatch, user, updates) {
  // 🐨 use the userClient.updateUser function to send updates to the backend
  // 🐨 then when that's completed, dispatch an 'update' action with the updated
  // user information you get back
  // 💰 userClient.updateUser(user, updates) returns a promise which resolves
  // to the updatedUser.
  // 💰 this is an async function so you can use `await` if you want :)
}

// 🦉 here's where you'd normally export all this stuff

// src/screens/user-profile.js

// 🦉 here's where you'd normally import all the stuff you need from the context

function UserSettings() {
  // 🐨 get the user object and userDispatch function from context
  const user = {}
  const userDispatch = () => {}

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
    updateUser(userDispatch, user, formState).then(
      () => {
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
        {isRejected ? (
          <div style={{color: 'red'}}>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
    </form>
  )
}

function UserDataDisplay() {
  // 🐨 get the user from context
  const user = {}
  return (
    <pre data-testid="user-data-display">{JSON.stringify(user, null, 2)}</pre>
  )
}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=Advanced%20React%20Patterns&e=Context&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return (
    <div
      style={{
        height: 350,
        width: 300,
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 10,
      }}
    >
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  )
}
Usage.title = 'Context'

export default Usage
