import { useAuthContext } from "./useAuthContext";
import { useCattleContext } from "./useCattlesContext";
import { AUTH_ACTIONS } from "../context/AuthContext";
import { ACTIONS } from "../context/CattleContext";

export const useLogout = function (){
  const { dispatch } = useAuthContext()
  const { dispatch: cattleDispatch } = useCattleContext()

  const logout = function (){
    localStorage.removeItem('user')
    
    // dispatch logout action
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
    cattleDispatch({ type: ACTIONS.SET_CATTLE, payload: null })
  }
  return {logout}
}