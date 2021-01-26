import * as React from 'react'
import type {User} from './types'

// normally this is going to implement a similar pattern
// learn more here: https://kcd.im/auth

interface IAuthContext {
  user: User
}

const AuthContext = React.createContext<IAuthContext>({
  user: {username: 'jakiechan', tagline: '', bio: ''},
})
AuthContext.displayName = 'AuthContext'

const AuthProvider: React.FC<{user: IAuthContext}> = ({user, ...props}) => (
  <AuthContext.Provider value={user} {...props} />
)

function useAuth(): IAuthContext {
  return React.useContext(AuthContext)
}

export {AuthProvider, useAuth}
