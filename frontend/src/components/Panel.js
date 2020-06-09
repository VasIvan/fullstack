import React, {useContext, useEffect} from "react"
import { authContext } from "../contexts/AuthContext"
import { UserContext } from '../App'

const Panel = () => {
  const { setAuthData, auth } = useContext(authContext)
  const userContext = useContext(UserContext)

  const onLogOut = () => {
    setAuthData(null)
    userContext.userDispatch({type: 'USER_OFF'})
  } //clearing the context

  //function for decoding the jwt token
  const jwtDecode =  (t) => {
    let token = {}
    token.raw = t
    token.header = JSON.parse(window.atob(t.split('.')[0]))
    token.payload = JSON.parse(window.atob(t.split('.')[1]))
    return (token)
  }

  const userEmail = jwtDecode(auth.data)

  useEffect(() => {
    console.log(userEmail.payload)
    userContext.userDispatch({type: 'USER_ON', name: userEmail.payload.name, email: userEmail.payload.email})
  }, [auth.data])


  return (
    <div className="container">
      <div className='form-box'>
        <h1>{`Hello,  ${userEmail.payload.name} !`}</h1>
        <button type="button" className="btn btn-primary" onClick={onLogOut}>Log out</button>
  <h1>{userContext.userState.email}</h1>
      </div>
    </div>
  );
};

export default Panel;