import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useHistory, Link} from 'react-router-dom'

function CreateUser() {
    const history = useHistory()

    const [error, setError] = useState('')

    const {register, handleSubmit, errors} = useForm()

    const onSubmit = (data) => {
        //console.log(data.username)

        axios.post('http://localhost:5000/api/user/register', data)
            .then(res => console.log(res.data))
            .then(() =>{
                console.log(history)
                history.replace('/login')}) //redirecting to login page
            .catch(err => {
                setError(err.response.data)
                console.log(err.response.data)})
    }

    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='textbox'>
                        <input type='text' placeholder="Name" className='form-control' name="name" ref={register({required: 'Username required', minLength: {value:1, message: 'Min. lenght 1'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='email' placeholder="Email" className='form-control' name="email" ref={register({required: 'Email required', minLength: {value:6, message: 'Min. lenght 6'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='password' placeholder="Password" className='form-control' name="password" ref={register({required: 'Password required', minLength: {value:6, message: 'Min. lenght 6'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='password' placeholder="Repeat Password" className='form-control' name="password2" ref={register({required: 'Password2 required', minLength: {value:6, message: 'Min. lenght 6'}})} />
                    </div>
                        <input type='submit' value='Create Exercise Log' className='btn btn-primary' />
                        <Link to='/login' className='form-link'>
                            <p>Login</p>
                        </Link>

        {errors.name &&  <h1>{errors.name.message}</h1>}
        {errors.email &&  <h1>{errors.email.message}</h1>}
        {errors.password &&  <h1>{errors.password.message}</h1>}
        {errors.password2 &&  <h1>{errors.password2.message}</h1>}
        {error &&  <h1>{error}</h1>}

                </form>
            </div>
        </div>
    )
}

export default CreateUser
