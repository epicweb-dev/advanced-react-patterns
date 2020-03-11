import React from 'react'

// normally this is going to implement a similar pattern
// learn more here: https://kcd.im/auth

const AuthContext = React.createContext({
  user: {username: 'jakiechan', tagline: '', bio: ''},
})
AuthContext.displayName = 'AuthContext'
const AuthProvider = ({user, ...props}) => (
  <AuthContext.Provider value={user} {...props} />
)

function useAuth() {
  return React.useContext(AuthContext)
}

export {AuthProvider, useAuth}
