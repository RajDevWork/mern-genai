import { useContext, useEffect } from "react"; // notmal context ko use karne ke liye
import { AuthContext } from "../auth.context"; // hamara auth context
import { login,register,logout,getMe } from "../services/auth.api"; // sabhi api functions ko import kar liya.



export const useAuth = ()=>{
    const context = useContext(AuthContext) // AuthContext mein jo bhi provided data hain usko context var me save kiya 
    const {User,setUser,IsLoading,setIsLoading} = context // jo hamne auth context me as a provider value diya tha wo sabhi ko destructure kiye

    /**Yahan par abb hum sabhi api ke call sath hi UI me changes ko handle karenge */

    //handle login
    const handleLogin = async({email,password})=>{
        setIsLoading(true)
        const data = await login({email,password})
        setUser(data.user)
        setIsLoading(false)
    }

    //handle register
    const handleRegister = async({username,email,password})=>{
        setIsLoading(true)
        const data = await register({username,email,password})
        setUser(data.user)
        setIsLoading(false)
    }

    //handle logout

    const handleLogout = async()=>{
        setIsLoading(true)
        await logout()
        setUser(null)
        setIsLoading(false)

    }

    //handle get user data
    const handleGetMe = async()=>{
        setIsLoading(true)
        const data = await getMe()
        setUser(data.user)
        setIsLoading(false)
    }


    useEffect(()=>{
       const SetUser = async()=>{
            const data = await getMe()
            setUser(data.user)
            setIsLoading(false)
       }
       SetUser()
    },[])


    return {User,IsLoading,handleLogin,handleRegister,handleLogout,handleGetMe}

}