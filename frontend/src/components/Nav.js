import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { authContext } from '../contexts/AuthContext'
import { UserContext } from '../App'

function Nav() {
    const { auth, setAuthData } = useContext(authContext)
    const userContext = useContext(UserContext)

    const onLogOut = () => {
        setAuthData(null)
        userContext.userDispatch({type: 'USER_OFF'})
    }
    
    return (
        <nav>
            <Link to='/' className='nav-links'>
                <h3 className='logo'>Fix It</h3>
            </Link>
            <ul className='nav-links'>
                {/*<Link to='/reg' className='nav-links'>
                    <li>Registration</li>
    </Link>*/}
                <Link to='/fetch' className='nav-links'>
                    <li>DataFetch</li>
                </Link>
                <Link to='/fetch/posts' className='nav-links'>
                    <li>Posts</li>
                </Link>
                <Link to='/login' className='nav-links'>
                    { auth.data ? (<li onClick={onLogOut}>Logout</li>):(<li>Login</li>)}
                </Link>
            </ul>
        </nav>
    )
}

export default Nav