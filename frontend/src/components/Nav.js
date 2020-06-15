import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import { authContext } from '../contexts/AuthContext'
import { UserContext } from '../App'
import {AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import { Menu, AccountCircle } from "@material-ui/icons"
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import FormatPaintIcon from '@material-ui/icons/FormatPaint'

function Nav() {
    const { auth, setAuthData } = useContext(authContext)
    const userContext = useContext(UserContext)
    const [open, setOpen] = useState(false)

    const onLogOut = () => {
        setAuthData(null)
        userContext.userDispatch({type: 'USER_OFF'})
    }
    
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton onClick={() => setOpen(true)} color="inherit" edge='start' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography component={Link} to="/" variant='h4' color="inherit"  style={{flexGrow: 1}}>
                        FIX I
                        <FormatPaintIcon fontSize="large"/>
                    </Typography>
                    { auth.data ? 
                    (<IconButton onClick={onLogOut} color="inherit" aria-label='exit'>
                        <ExitToAppIcon />
                    </IconButton>):
                    (<IconButton component={Link} to="/login" color="inherit" aria-label='account'>
                        <AccountCircle />
                    </IconButton>)}
                </Toolbar>
            </AppBar>
            <Drawer
                style={{height: "100%", width: "250px"}}
                anchor='left'
                open={open}
                onClose={ () => {setOpen(false)}}
            >
                <List>
                    <ListItem button component={Link} to='/fetch/posts' onClick={() => setOpen(false)}>
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText>
                            All Posts
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/fetch/posts/my' onClick={() => setOpen(false)}>
                        <ListItemIcon>
                            <LibraryAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText>
                            My Posts
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/fetch/posts/add' onClick={() => setOpen(false)}>
                        <ListItemIcon>
                            <LibraryAddIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Add Post
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Nav