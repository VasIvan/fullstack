import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useHistory, Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Linka from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

function CreateUser() {
    const classes = useStyles();

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    {errors.name &&  <Alert variant="outlined" severity="error">{errors.name.message}</Alert>}
                    {errors.email &&  <Alert variant="outlined" severity="error">{errors.email.message}</Alert>}
                    {errors.password &&  <Alert variant="outlined" severity="error">{errors.password.message}</Alert>}
                    {errors.password2 &&  <Alert variant="outlined" severity="error">{errors.password2.message}</Alert>}
                    {error &&  <Alert variant="outlined" severity="error">{error}</Alert>}
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'Name required', minLength: {value:1, message: 'Name min. lenght 1'}})}
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        type="text"
                        autoComplete="name"
                    />
                    
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
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'Repeat Password required', minLength: {value:6, message: 'Repeat Password Min. lenght 6'}})}
                        required
                        fullWidth
                        name="password2"
                        label="Repeat Password"
                        type="password"
                        autoComplete="repeat-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Linka component={Link} to="/login" variant="body2">
                            Already have an account? Sign In
                        </Linka>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    )
}

export default CreateUser
