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
                {posts.map(post => <div key={post._id}>
                    <div><h6>{post.date.substring(0,10)}</h6><h1>{post.title}</h1></div>
                    <div>{post.description}</div>
                    <div>{post.wage}€/hour</div>
                    <div>{post.name}/{post.email}/{post.phone}/{post.city}</div>
                <hr /></div>)}
        </div>
    )
}

export default PostsFetching