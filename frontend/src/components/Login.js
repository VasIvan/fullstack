import React, {useState, useContext} from 'react'
import { UserContext } from '../App'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { authContext } from '../contexts/AuthContext'
import { useHistory, Link } from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Linka from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Login() {
    const classes = useStyles();

    const history = useHistory()

    const [error, setError] = useState('')

    const {register, handleSubmit, errors} = useForm()

    const { setAuthData } = useContext(authContext);

    const userContext = useContext(UserContext)

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/api/user/login', data)
            .then(res => {
              userContext.userDispatch({type: 'USER_ON', email: res.data.email, name: res.data.name}) //Optional if we do not want to take the information from the localStorage
              setAuthData(res.data.token)
              localStorage.setItem('userEmail', JSON.stringify(res.data.email))
              localStorage.setItem('userName', JSON.stringify(res.data.name))}) // setting the token to the localstorage
            .then(() =>{
                history.replace('/')}) //redirecting to home page
            .catch(err => {
                setError(err.response.data)
                //console.log(err.response.data)})
                console.log(err)})
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  {errors.password &&  <Alert variant="outlined" severity="error">{errors.password.message}</Alert>}
                  {errors.email &&  <Alert variant="outlined" severity="error">{errors.email.message}</Alert>}
                  {error &&  <Alert variant="outlined" severity="error">{error}</Alert>}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({required: 'Email required', minLength: {value:6, message: 'Email min. lenght 6'}})}
                    required
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({required: 'Password required', minLength: {value:6, message: 'Password Min. lenght 6'}})}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Linka component={Link} to="/reg" variant="body2">
                        Don't have an account? Sign Up
                      </Linka>
                    </Grid>
                  </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login