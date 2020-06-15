import React, {useContext} from "react"
import { authContext } from "../contexts/AuthContext"
import { UserContext } from '../App'
import { Link } from "react-router-dom"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';

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
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Panel = () => {
  const classes = useStyles();
  const { setAuthData } = useContext(authContext)
  const userContext = useContext(UserContext)

  const onLogOut = () => {
    setAuthData(null)
    userContext.userDispatch({type: 'USER_OFF'})
  } //clearing the context


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography display="inline" variant="h3" align="center">Hello, {userContext.userState.name} !</Typography>
        <Typography variant="h6" align="center">Thank you for joining Fix It Team. Here you can publish a post with what kind of a services you provide, description of your work and how much it will cost per hour.</Typography>
        
        <Button
          component={Link}
          to='/fetch/posts/add'
          variant="outlined"
          color="secondary"
          fullWidth
          className={classes.button}
        >
          Add Post
        </Button>

        <Button
          onClick={onLogOut}
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.button}
        >
          Log out
        </Button>
      </div>
    </Container>
  );
};

export default Panel;