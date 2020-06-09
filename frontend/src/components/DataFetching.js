import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../App'

function DataFetching() {

    const [users, setUsers] = useState([])
    const userContext = useContext(UserContext)

    useEffect( () => {
        axios.get('http://localhost:5000/api/user')
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    } , [])

    return (
        <div>
            <ul>
    {users.map(user => <li key={user._id}> {user.email}</li>)}
            </ul>
            <h1>{userContext.userState.email}</h1>
        </div>
    )
}

export default DataFetching