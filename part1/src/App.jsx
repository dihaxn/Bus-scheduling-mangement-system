import { useState } from 'react'
import Navbar from './components/Navbar'
import Search from './components/Search'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar />
     <Search />
    </>
  )
}

export default App
