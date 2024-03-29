import { createContext, useReducer } from "react";

export const ACTIONS = {
    SET_CATTLE: 'set_cattle',
    CREATE_CATTLE: 'create_cattle',
    DELETE_CATTLE: 'delete_cattle'
}

export const CattleContext = createContext();

export const cattleReducer = (state, action) => {
     switch (action.type) {
        case ACTIONS.SET_CATTLE:
            return { cattles: action.payload };
        case ACTIONS.CREATE_CATTLE:
             // adds newly created cattle on top of previous state of cattles.
            return { cattles: [action.payload, ...state.cattles]};
        case ACTIONS.DELETE_CATTLE:
            return {
                cattles: state.cattles.filter((cattle) => cattle._id !== action.payload._id)
            };
         default:
            return state;
    }
}

export const CattleContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cattleReducer, {
         cattles: null
        })

    return (
        <CattleContext.Provider value={{...state, dispatch}}>
            { children }
        </CattleContext.Provider>
    )
}
