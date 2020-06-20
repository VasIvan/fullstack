import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import EuroIcon from '@material-ui/icons/Euro';
import {useLocation} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    arrow: {
      margin: theme.spacing(1),
      textAlign: 'center',
      width: 40
    },
    icon: {
        width: 40,
        height: 30
    },
    grid: {
        borderBottom: '5px solid',
        marginBottom: 50
    }

  }));

function PostsFetching() {

    const classes = useStyles();

    const userContext = useContext(UserContext)

    const [posts, setPosts] = useState([])

    const [start, setStart] = useState(0)
    const [stop, setStop] = useState(5)

    const [open, setOpen] = useState(false) //Dialog edit post
    const [editPost, setEditPost] = useState({}) // curent user info

    const [error, setError] = useState('')

    const {register, handleSubmit, errors} = useForm()

    const onSubmit = (data, e) => {
        e.preventDefault()
        //console.log(editPost._id)
        axios.post('http://localhost:5000/api/posts/edit/' + editPost._id, data)
            .then(res => alert(res.data))
            .then(() =>{
                setOpen(false)
                setError('')
                fetchPosts()
                return})
            .catch(err => {
                setError(err.response.data)})
        handleClose()
    }

    const handleClickOpen = (post) => {
      setOpen(true);
      setEditPost(post)
      //console.log(editPost)
    };

//    useEffect( () => {
//        console.log(editPost)
//    } , [open]) // if path change fetch posts again
  
    const handleClose = () => {
      setOpen(false);
    };

    let location = useLocation()
    //console.log(location)
    let userPath = ''
    if( location.pathname === "/fetch/posts/my"){
        userPath = 'my/' + userContext.userState.email
    }
    //console.log(userPath)

    useEffect( () => {
        fetchPosts()
        setStart(0)
        setStop(5)
    } , [userPath]) // if path change fetch posts again

    const fetchPosts = () => {
        axios.get('http://localhost:5000/api/posts/'+userPath)
        .then(res => {
            //console.log(res)
            setPosts(res.data.reverse()) // set Posts from newest to oldest
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deletePost = id => {
        axios.delete('http://localhost:5000/api/posts/my/delete/'+id)
        .then(res => {
            //console.log(res)
            fetchPosts()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const isEmptyArray = () => {
        if (posts === undefined || posts.length == 0){
            return true
        }
        return false
    }

    return (
        <div className={classes.root}>
            <Container maxWidth='md' align='center'>
                { isEmptyArray()
                    ?
                    <Alert severity="warning" action={ 
                        <Button component={Link} to="/fetch/posts/add" color="inherit" size="large">Add post</Button>}>
                        <strong>0 posts found!</strong> Add your first post?
                    </Alert>
                    :
                    posts.slice(start, stop).map(post => 
                        <Grid container className={classes.grid} spacing={3} key={post._id}>
                            <Grid item xs={12} sm={4}>
                            <Typography variant="h6">{post.date.substring(0,10)}</Typography>
                                <Typography variant="h3" style={{ wordWrap: "break-word" }}>{post.title}</Typography>
                                
                                {userContext.userState.email === post.email && 
                                <div>
                                    <Button 
                                    onClick={() => deletePost(post._id)}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    fullWidth
                                    >
                                        DELETE
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleClickOpen(post)}
                                    startIcon={<EditIcon />}
                                    fullWidth
                                    >
                                        EDIT
                                    </Button>
                                    <Dialog
                                      open={open}
                                      onClose={handleClose}
                                      aria-labelledby="form-dialog-title"
                                    >
                                      <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                                      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                                      <DialogContent>

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
                                            inputRef={register({required: 'Phone required', minLength: {value:6, message: 'Phone Min. lenght 6'}})}
                                            fullWidth
                                            name="phone"
                                            label="Phone Number"
                                            type="text"
                                            autoComplete="phone"
                                            defaultValue={editPost.phone}
                                            onChange={ (e) => setEditPost({...editPost, phone: e.target.value})}
                                        />

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            inputRef={register({required: 'Title required', minLength: {value:2, message: 'Title Min. lenght 2'}})}
                                            fullWidth
                                            name="title"
                                            label="Title"
                                            type="text"
                                            autoComplete="title"
                                            defaultValue={editPost.title}
                                            onChange={(e) => setEditPost({...editPost, title: e.target.value})}
                                        />

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            inputRef={register({required: 'Description required', minLength: {value:20, message: 'Description Min. lenght 20'}, maxLength: {value:255, message: 'Description Max. lenght 255'}})}
                                            fullWidth
                                            multiline
                                            rows={5}
                                            rowsMax={5}
                                            name="description"
                                            label="Description here..."
                                            type="text"
                                            autoComplete="description"
                                            defaultValue={editPost.description}
                                            onChange={(e) => setEditPost({...editPost, description: e.target.value})}
                                        />

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            inputRef={register({required: 'City required', minLength: {value:1, message: 'City Min. lenght 1'}})}
                                            fullWidth
                                            name="city"
                                            label="City"
                                            type="text"
                                            autoComplete="city"
                                            defaultValue={editPost.city}
                                            onChange={(e) => setEditPost({...editPost, city: e.target.value})}
                                        />
                                        
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            inputRef={register({required: 'Wage required', minLength: {value:1, message: 'Wage Min. lenght 1'}})}
                                            fullWidth
                                            name="wage"
                                            label="Wage(€/h)"
                                            type="number"
                                            autoComplete="wage"
                                            defaultValue={editPost.wage}
                                            onChange={(e) => setEditPost({...editPost, wage: e.target.value})}
                                        />

                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                          Cancel
                                        </Button>
                                        <Button type='submit' color="primary">
                                          Edit
                                        </Button>
                                      </DialogActions>
                                      </form>
                                    </Dialog>
                                </div>
                                }

                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Typography variant="h5" style={{ wordWrap: "break-word" }}>
                                    <PersonIcon /> {post.name}
                                </Typography> 
                                <Typography variant="h6" style={{ wordWrap: "break-word" }}>
                                    <EmailIcon />{post.email} 
                                </Typography> 
                                <Typography variant="h6" style={{ wordWrap: "break-word" }}>
                                    <PhoneIphoneIcon />{post.phone} 
                                </Typography> 
                                <Typography variant="h5" style={{ wordWrap: "break-word" }}>
                                    <LocationCityIcon />{post.city}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4" style={{ wordWrap: "break-word" }}>
                                    <TimelapseIcon/> : 1 hour <hr />
                                    <EuroIcon /> : {post.wage} euro
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ wordWrap: "break-word" }}>
                                    {post.description}
                                </Typography>
                            </Grid>
                        
                        <hr />
                        </Grid>)}
                    {start > 5 && <Button
                    onClick={() => {setStart(0); setStop(5)}}
                    variant="contained"
                    color="primary"
                    className={classes.arrow}
                    startIcon={<LooksOneIcon  className={classes.icon}/>}
                    >
                    </Button>}
                    {start > 0 && <Button
                    onClick={() => {setStart(start - 5); setStop(stop - 5)}}
                    variant="contained"
                    color="primary"
                    className={classes.arrow}
                    startIcon={<ArrowLeftIcon className={classes.icon}/>}
                    >
                    </Button>}
                    {stop < posts.length && posts.length > 5 && <Button 
                    onClick={() => {setStart(start + 5); setStop(stop + 5)}}
                    variant="contained"
                    color="primary"
                    className={classes.arrow}
                    startIcon={<ArrowRightIcon className={classes.icon} />}
                    >
                    </Button>}
            </Container>
        </div>
    )
}

export default PostsFetching