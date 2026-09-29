import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
          e.preventDefault()

        const formData = new FormData(e.target)

        axios.post('http://localhost:3000/create-post',formData)
        .then((res) => {
            navigate('/feed')
        })
        .catch((err) => {
            console.log(err)
            alert("error creating post")
        })
    }

  return (
    <section className="create_post">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept="image/*" />
            <input type="text" name="caption" placeholder="eneter caption" required />
            <button type="submit">submit</button>
        </form>
    </section>
  )
}

export default Home
