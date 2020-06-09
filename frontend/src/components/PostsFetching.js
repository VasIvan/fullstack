import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PostsNav from './PostsNav'

function PostsFetching() {
    const [posts, setPosts] = useState([])

    useEffect( () => {
        axios.get('http://localhost:5000/api/posts')
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    } , [])

    return (
        <div className="container">
            <PostsNav />
            <ul>
                {posts.map(post => <li key={post._id}> {post.title}</li>)}
            </ul>
        </div>
    )
}

export default PostsFetching