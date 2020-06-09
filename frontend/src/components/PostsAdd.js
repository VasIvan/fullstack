import React, {useState, useContext} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import PostsNav from './PostsNav'
import { useHistory } from "react-router-dom"
import { UserContext } from '../App'


function PostsAdd() {
    const userContext = useContext(UserContext)

    const history = useHistory()

    const [error, setError] = useState('')

    const {register, handleSubmit, errors} = useForm()

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/api/posts/add', data)
            .then(res => alert(res.data))
            .then(() =>{
                console.log(history)
                history.replace('/')}) //redirecting to home page
            .catch(err => {
                setError(err.response.data)
                console.log(err.response.data)})
    }

    return (
        <div className='container'>
            <div className='form-box'>
                <PostsNav />
                <h1>Add Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='textbox'>
                        <input type='text' value={userContext.userState.name} readOnly className='form-control' name="name" ref={register({required: 'Username required', minLength: {value:1, message: 'Name Min. lenght 1'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='email' value={userContext.userState.email} readOnly className='form-control' name="email" ref={register({required: 'Email required', minLength: {value:6, message: 'Email Min. lenght 6'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='text' placeholder="Phone Number" className='form-control' name="phone" ref={register({required: 'Phone required', minLength: {value:6, message: 'Phone Min. lenght 6'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='text' placeholder="Title" className='form-control' name="title" ref={register({required: 'Title required', minLength: {value:2, message: 'Title Min. lenght 6'}})} />
                    </div>
                    <div className='textbox'>
                        <textarea  placeholder="Description here ..." rows="12" cols="40" className='form-control' name="description" ref={register({required: 'Description required', minLength: {value:20, message: 'Description Min. lenght 20'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='text' placeholder="City" className='form-control' name="city" ref={register({required: 'City required', minLength: {value:1, message: 'City Min. lenght 1'}})} />
                    </div>
                    <div className='textbox'>
                        <input type='number' placeholder="Wage(€/h)" className='form-control' name="wage" ref={register({required: 'Wage required', minLength: {value:1, message: 'Wage Min. lenght 1'}})} /> €/h
                    </div>
                        <input type='submit' value='Create Exercise Log' className='btn btn-primary' />

        {errors.name &&  <h1>{errors.name.message}</h1>}
        {errors.email &&  <h1>{errors.email.message}</h1>}
        {errors.phone &&  <h1>{errors.phone.message}</h1>}
        {errors.title &&  <h1>{errors.title.message}</h1>}
        {errors.description &&  <h1>{errors.description.message}</h1>}
        {errors.city &&  <h1>{errors.city.message}</h1>}
        {errors.wage &&  <h1>{errors.wage.message}</h1>}
        {error &&  <h1>{error}</h1>}

                </form>
            </div>
        </div>
    )
}

export default PostsAdd
