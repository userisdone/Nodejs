import { useState,useEffect } from "react"
import axios from 'axios'

const Feed = () => {
  const [posts , setPosts] = useState([
    {
        _id:'1',
        image:'https://images.unsplash.com/photo-1788529929442-016870421b4b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        caption:'scenery'
    }
  ])

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
    .then((res) => {
      setPosts(res.data.posts)
    })
  },[])

  return (
   <section className="feed-section">
        { posts.length > 0 ? (
            posts.map((post) => 
            <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
             </div>
             )):(<h1>No posts available</h1>)
        }
   </section>
  )
}

export default Feed
