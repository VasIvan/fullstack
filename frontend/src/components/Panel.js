import React, {useContext, useEffect} from "react"
import { authContext } from "../contexts/AuthContext"
import { UserContext } from '../App'
import { Link } from "react-router-dom"

const Panel = () => {
  const { setAuthData, auth } = useContext(authContext)
  const userContext = useContext(UserContext)

  const onLogOut = () => {
    setAuthData(null)
    userContext.userDispatch({type: 'USER_OFF'})
  } //clearing the context


  return (
    <div className="container">
      <div className='welcome'>
        <h1>{`Hello, ${userContext.userState.name} !`}</h1>
        <p>Thank you for joining Fix It Team. Here you can publish a post with what kind of a services you provide, description of your work and how much it will cost per hour.</p>
        <Link to='/fetch/posts/add'>
          <button className='btn btn-primary'>Add Post</button>
        </Link>
        <button type="button" className="btn btn-primary" onClick={onLogOut}>Log out</button>
        {/*<h1>{userContext.userState.email}</h1>*/}
      </div>
    </div>
  );
};

export default Panel;