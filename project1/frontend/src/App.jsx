import { Route, Routes } from "react-router-dom"
import Home from './home/Home'
import Feed from './feed/Feed'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </div>
  )
}

export default App
