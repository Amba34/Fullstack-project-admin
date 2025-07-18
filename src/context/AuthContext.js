import { createContext, useEffect, useReducer } from "react";

let user = null;
try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    user = null;
}

const INITIAL_STATE = {
    user: user,
    loading : false,
    error : null
};

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user : null,
                loading : true,
                error : null
            };
        case "LOGIN_FAILED":
            return {
                user : null,
                loading : false,
                error : action.payload
            };
            case "LOGIN_SUCCESS":
                return {
                    user : action.payload,
                    loading : false,
                    error : null
                };

        case "lOGOUT" :
            return{
                user : null,
                loading : false,
                error : null      
            }

        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    useEffect(() => {
        localStorage.setItem("user" , JSON.stringify(state.user));

    },[state.user])


 
    return (
        
        <AuthContext.Provider value={{
            user: state.user, loading: state.loading, error: state.error, dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )


};
