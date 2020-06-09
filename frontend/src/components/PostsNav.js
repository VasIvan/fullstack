import React from 'react'
import {Link} from 'react-router-dom'

function PostsNav() {
    
    return (
        <div>
            <Link to='/fetch/posts' className='btn btn-primary'>
                <p>All Posts</p>
            </Link>
            <Link to='/fetch/posts/my' className='btn btn-primary'>
                <p>My Posts</p>
            </Link>
            <Link to='/fetch/posts/add' className='btn btn-primary'>
                <p>Add Post</p>
            </Link>
        </div>
    )
}

export default PostsNav