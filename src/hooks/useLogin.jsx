import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { AUTH_ACTIONS } from "../context/AuthContext"
import API_BASE_URL from "../apiConfig"

export const useLogin = function() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async function(email, password) {

        setIsLoading(true)
        setError(null)

        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save user to a local storage
            localStorage.setItem("user", JSON.stringify(json))

            // update auth const
            dispatch({type: AUTH_ACTIONS.LOGIN, payload: json})

            setIsLoading(false)
        }
    }
    return { login, isLoading, error}
}
