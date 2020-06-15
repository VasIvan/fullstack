import React, {useReducer} from 'react'
import './App.scss'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Nav from './components/Nav'
import CreateUser from './components/CreateUser.component'
import PostsFetching from './components/PostsFetching'
import PostsAdd from './components/PostsAdd'
import Login from './components/Login'
import AuthProvider from './contexts/AuthContext'
import Panel from './components/Panel'
import PrivateRoute from './components/PrivateRoute'

export const UserContext = React.createContext()

const initialState = {email: JSON.parse(localStorage.getItem('userEmail')), name: JSON.parse(localStorage.getItem('userName'))}



const reducer = (state, action) => {
  switch(action.type){
    case 'USER_ON': //Optional if we do not want to take the information from the localStorage
      return {
        email: action.email,
        name: action.name
      }

    case 'USER_OFF':{
      localStorage.removeItem('authData')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
      return {
        email: '',
        name: ''
      }
    }
    
    default:
      return state
  }
  }


function App() {

  const [user, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthProvider>
      <UserContext.Provider value={{userState: user, userDispatch: dispatch}}>
        <Router>
          <Nav />
          <Switch>
            <Route path='/reg' component={CreateUser} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/fetch/posts/add' component={PostsAdd} />
            <PrivateRoute path='/fetch/posts/my' component={PostsFetching} />
            <PrivateRoute path='/fetch/posts' component={PostsFetching} />
            <PrivateRoute path='/' component={Panel} />
          </Switch>
        </Router>
        </UserContext.Provider>
    </AuthProvider>
  );
}

export default App;
