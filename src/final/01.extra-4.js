// Context
// 💯 avoiding unmount issues

import React from 'react'
import dequal from 'dequal'

// ./context/user-context.js

import * as userClient from '../user-client'
import {useAuth} from '../auth-context'

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

function userReducer(state, action) {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        user: {...state.user, ...action.updates},
        status: 'pending',
        storedUser: state.user,
      }
    }
    case 'finish update': {
      return {
        ...state,
        user: action.updatedUser,
        status: 'resolved',
        storedUser: null,
        error: null,
      }
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      }
    }
    case 'reset': {
      return {
        ...state,
        status: null,
        error: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}) {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  })

  const canDispatch = React.useRef(true)
  React.useLayoutEffect(
    () => () => {
      canDispatch.current = false
    },
    [],
  )
  const safeDispatch = React.useCallback((...args) => {
    canDispatch.current && dispatch(...args)
  }, [])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={safeDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error(`useUserState must be used within a UserProvider`)
  }
  return context
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error(`useUserDispatch must be used within a UserProvider`)
  }
  return context
}

// got this idea from Dan and I love it:
// https://twitter.com/dan_abramov/status/1125773153584676864
async function updateUser(dispatch, user, updates) {
  dispatch({type: 'start update', updates})
  try {
    const updatedUser = await userClient.updateUser(user, updates)
    dispatch({type: 'finish update', updatedUser})
    return updatedUser
  } catch (error) {
    dispatch({type: 'fail update', error})
    return Promise.reject(error)
  }
}

// export {UserProvider, useUserDispatch, useUserState, updateUser}

// src/screens/user-profile.js
// import {UserProvider, useUserState, updateUser} from './context/user-context'
function UserSettings() {
  const {user, status, error} = useUserState()
  const userDispatch = useUserDispatch()

  const isPending = status === 'pending'
  const isRejected = status === 'rejected'

  const [formState, setFormState] = React.useState(user)

  const isChanged = !dequal(user, formState)

  function handleChange(e) {
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  function handleSubmit(event) {
    event.preventDefault()
    updateUser(userDispatch, user, formState).catch(() => {
      /* ignore the error */
    })
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
            userDispatch({type: 'reset'})
          }}
          disabled={!isChanged}
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
        {isRejected ? <pre style={{color: 'red'}}>{error.message}</pre> : null}
      </div>
    </form>
  )
}

function UserDataDisplay() {
  const {user} = useUserState()
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function Usage() {
  const [showUserScreen, setShowUserScreen] = React.useState(true)
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
      <label>
        <input
          type="checkbox"
          checked={showUserScreen}
          onChange={e => setShowUserScreen(e.target.checked)}
        />{' '}
        show user screen
      </label>
      {showUserScreen ? (
        <UserProvider>
          <UserSettings />
          <UserDataDisplay />
        </UserProvider>
      ) : null}
    </div>
  )
}

export default Usage
