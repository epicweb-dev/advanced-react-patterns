// Context Module Functions
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {dequal} from 'dequal'

// ./context/user-context.js

import * as userClient from '../user-client'
import {useAuth} from '../auth-context'
import type {User} from '../types'

type State = {
  status: null | 'pending' | 'resolved' | 'rejected'
  error: null | Error
  user: User
  storedUser: null | User
}

type Action =
  | {type: 'start update'; updates: User}
  | {type: 'finish update'; updatedUser: User}
  | {type: 'fail update'; error: Error}
  | {type: 'reset'}
function userReducer(state: State, action: Action): State {
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
        // @ts-expect-error FIXME: Type 'User | null' is not assignable to type 'User'.
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
      // @ts-expect-error
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

type UserContextType = readonly [state: State, dispatch: React.Dispatch<Action>]
const UserContext = React.createContext<UserContextType>(undefined!)
UserContext.displayName = 'UserContext'

type UserProviderProps = {children: React.ReactNode}
function UserProvider({children}: UserProviderProps): JSX.Element {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  })
  const value = [state, dispatch] as const
  return <UserContext.Provider value={value} children={children} />
}

function useUser(): UserContextType {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

// 🐨 add a function here called `updateUser`
// Then go down to the `handleSubmit` from `UserSettings` and put that logic in
// this function. It should accept: dispatch, user, and updates

// export {UserProvider, useUser}

// src/screens/user-profile.js
// import {UserProvider, useUser} from './context/user-context'
function UserSettings(): JSX.Element {
  const [{user, status, error}, userDispatch] = useUser()

  const isPending: boolean = status === 'pending'
  const isRejected: boolean = status === 'rejected'

  const [formState, setFormState] = React.useState(user)

  const isChanged: boolean = !dequal(user, formState)

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void {
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    // 🐨 move the following logic to the `updateUser` function you create above
    userDispatch({type: 'start update', updates: formState})
    userClient.updateUser(user, formState).then(
      updatedUser => userDispatch({type: 'finish update', updatedUser}),
      error => userDispatch({type: 'fail update', error}),
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
            userDispatch({type: 'reset'})
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
        {isRejected ? <pre style={{color: 'red'}}>{error?.message}</pre> : null}
      </div>
    </form>
  )
}

function UserDataDisplay(): JSX.Element {
  const [{user}] = useUser()
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function App(): JSX.Element {
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
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  )
}

export default App
