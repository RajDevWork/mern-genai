import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [User, setUser] = useState(null)
    const [IsLoading, setIsLoading] = useState(true)

    



    return (
        <AuthContext.Provider value={{User,setUser,IsLoading,setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )

}