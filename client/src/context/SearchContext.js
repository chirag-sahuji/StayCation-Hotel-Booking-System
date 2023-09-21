import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
    city: sessionStorage.getItem('city') || undefined,
    dates: JSON.parse(sessionStorage.getItem('dates')) || [],
    options: JSON.parse(sessionStorage.getItem('options')) || {
        adult: undefined,
        children: undefined,
        room:undefined
    }
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)
    
    useEffect(() => {
        sessionStorage.setItem('city', state.city)
        sessionStorage.setItem('dates', JSON.stringify(state.dates))
        sessionStorage.setItem('options',JSON.stringify(state.options))
    },[state.city,state.dates,state.options])

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}>
            {children}
        </SearchContext.Provider>
    )
}