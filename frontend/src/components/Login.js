import React, {useState, useContext} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { authContext } from '../contexts/AuthContext'
import { useHistory, Link } from "react-router-dom"

function Login() {

    const history = useHistory()

    const [error, setError] = useState('')

    const {register, handleSubmit, errors} = useForm()

    const { setAuthData } = useContext(authContext);

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/api/user/login', data)
            .then(res => setAuthData(res.data)) // setting the token to the localstorage
            .then(() =>{
                console.log(history)
                history.replace('/')}) //redirecting to home page
            .catch(err => {
                setError(err.response.data)
                //console.log(err.response.data)})
                console.log(err)})
    }

    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='textbox'>
                        <input type='email' placeholder="Email" name="email" ref={register({required: 'Email required', minLength: {value:6, message: 'Min. lenght 6'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='password' placeholder="Password" name="password" ref={register({required: 'Password required', minLength: {value:6, message: 'Min. lenght 6'}})} />
                    </div>
                        <input type='submit' value='Sing in' className='btn btn-primary' />
                        <Link to='/reg' className='form-link'>
                            <p>Registration</p>
                        </Link>
        {errors.name &&  <h1>{errors.name.message}</h1>}
        {errors.email &&  <h1>{errors.email.message}</h1>}
        {error &&  <h1>{error}</h1>}

                </form>
            </div>
        </div>
    )
}

export default Login
