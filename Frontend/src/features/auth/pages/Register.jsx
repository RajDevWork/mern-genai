import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth'

const Register = () => {
    const {IsLoading,handleRegister} = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/login")

    }

  return (
    <main>
        <div className='form-container'>
            {
                IsLoading? <h1>Loading...</h1>:''
            }
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} name="username" id="username" placeholder='Enter username'/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" id="email" placeholder='Enter email'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" id="password" placeholder='Enter password'/>
                </div>
                <button type="submit" className='button primary-button'>Register</button>
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register