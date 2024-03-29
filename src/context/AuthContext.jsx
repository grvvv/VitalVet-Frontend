import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const AUTH_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout"
}

export const authReducer = function(state, action) {
  switch (action.type){
    case AUTH_ACTIONS.LOGIN:
      return { user: action.payload}
    case AUTH_ACTIONS.LOGOUT:
      return { user: null}
    default:
      return state
  }

}
export const AuthContextProvider = function ({ children }){
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user){
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user})
    }
  }, [dispatch])
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}