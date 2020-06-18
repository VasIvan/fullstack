import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
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
                                {userContext.userState.email === post.email && <Button 
                                onClick={() => deletePost(post._id)}
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                >
                                    DELETE
                                </Button>}
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