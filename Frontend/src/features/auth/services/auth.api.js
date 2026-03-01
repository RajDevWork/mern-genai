
import axios from 'axios';

//creating axios instance
const api = axios.create({
    baseURL:'http://localhost:3000/api/auth',
    withCredentials:true //aisa isliye kiye hain kyunki sabhi me withCredential se cookies se interact kar rhe hain
})

export async function register({username,email,password}){

    try {
        const response = await api.post('/register',{
            username,email,password
        })
        return response.data        
    } catch (err) {
        console.log(err)
    }
}

export async function login({email,password}){

    try {
        const response  = await api.post("/login",{email,password})
        
        return response.data
    } catch (error) {
        console(error)
    }
}

export async function logout(){

    try {
            const response = await api.get("/logout")
            return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMe(){

    try {
        const response =  await api.get("/get-me")
        return response.data
    } catch (error) {
        console.log(error)
    }
}