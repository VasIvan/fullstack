import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import PostsNav from './PostsNav'
import { UserContext } from '../App'

function PostsMy() {

    useEffect( () => {
        fetchPosts()
    } , [])

    const userContext = useContext(UserContext)

    const [posts, setPosts] = useState([])

    const [start, setStart] = useState(0)
    const [stop, setStop] = useState(5)

    const fetchPosts = () => {
        axios.get('http://localhost:5000/api/posts/my/'+ userContext.userState.email)
        .then(res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deletePost = id => {
        axios.delete('http://localhost:5000/api/posts/my/delete/'+id)
        .then(res => {
            console.log(res)
            fetchPosts()
        })
        .catch(err => {
            console.log(err)
        })
    }



    return (
        <div className="container">
            <div className="container-box">
                <PostsNav />
                {posts.slice(start, stop).map(post => <div key={post._id}>
                        <div><h6>{post.date.substring(0,10)}</h6><h1>{post.title}</h1></div>
                        <div>{post.description}</div>
                        <div>{post.wage}€/hour</div>
                        <div>{post.name}/{post.email}/{post.phone}/{post.city}</div>
                        <button className="btn btn-primary" onClick={() => deletePost(post._id)}>DELETE</button>
                    <hr /></div>)}
                    {start > 5 && <button className="btn btn-primary" onClick={() => {setStart(0); setStop(5)}}>First page</button>}
                    {start > 0 && <button className="btn btn-primary" onClick={() => {setStart(start - 5); setStop(stop - 5)}}>Prev</button>}
                    {stop < posts.length && posts.length > 5 && <button className="btn btn-primary" onClick={() => {setStart(start + 5); setStop(stop + 5)}}>Next</button>}
            </div>
        </div>
    )
}

export default PostsMy