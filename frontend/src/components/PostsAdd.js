import React, {useState, useContext} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { UserContext } from '../App'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
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


function PostsAdd() {
    const classes = useStyles();

    const userContext = useContext(UserContext)

    const [error, setError] = useState('')

    const {register, handleSubmit, errors, reset} = useForm()

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/api/posts/add', data)
            .then(res => alert(res.data))
            .then(() =>{
                reset()
                setError('')
                return})
            .catch(err => {
                setError(err.response.data)})
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LibraryAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add post
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    {errors.name &&  <Alert variant="outlined" severity="error">{errors.name.message}</Alert>}
                    {errors.email &&  <Alert variant="outlined" severity="error">{errors.email.message}</Alert>}
                    {errors.phone &&  <Alert variant="outlined" severity="error">{errors.phone.message}</Alert>}
                    {errors.title &&  <Alert variant="outlined" severity="error">{errors.title.message}</Alert>}
                    {errors.description &&  <Alert variant="outlined" severity="error">{errors.description.message}</Alert>}
                    {errors.city &&  <Alert variant="outlined" severity="error">{errors.city.message}</Alert>}
                    {errors.wage &&  <Alert variant="outlined" severity="error">{errors.wage.message}</Alert>}
                    {error &&  <Alert variant="outlined" severity="error">{error}</Alert>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'Name required', minLength: {value:1, message: 'Name Min. lenght 1'}})}
                        disabled
                        value={userContext.userState.name}
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
                        disabled
                        value={userContext.userState.email}
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
                        inputRef={register({required: 'Phone required', minLength: {value:6, message: 'Phone Min. lenght 6'}})}
                        required
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        type="text"
                        autoComplete="phone"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'Title required', minLength: {value:2, message: 'Title Min. lenght 2'}})}
                        required
                        fullWidth
                        name="title"
                        label="Title"
                        type="text"
                        autoComplete="title"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'Description required', minLength: {value:20, message: 'Description Min. lenght 20'}, maxLength: {value:255, message: 'Description Max. lenght 255'}})}
                        required
                        fullWidth
                        multiline
                        rows={5}
                        rowsMax={5}
                        name="description"
                        label="Description here..."
                        type="text"
                        autoComplete="description"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'City required', minLength: {value:1, message: 'City Min. lenght 1'}})}
                        required
                        fullWidth
                        name="city"
                        label="City"
                        type="text"
                        autoComplete="city"
                    />
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({required: 'Wage required', minLength: {value:1, message: 'Wage Min. lenght 1'}})}
                        required
                        fullWidth
                        name="wage"
                        label="Wage(€/h)"
                        type="number"
                        autoComplete="wage"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Post
                    </Button>

                </form>
            </div>
        </Container>
    )
}

export default PostsAdd
