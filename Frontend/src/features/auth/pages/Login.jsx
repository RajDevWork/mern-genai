import React, { useState } from 'react'
import '../auth.form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth'
const Login = () => {
    const {IsLoading,handleLogin} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await handleLogin({email,password})
        navigate("/")

    }

  return (
    <main>
        <div className='form-container'>
            {
                IsLoading? <h1>Loading...</h1>:''
            }
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" id="email" placeholder='Enter email'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" id="password" placeholder='Enter password'/>
                </div>
                <button type="submit" className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login