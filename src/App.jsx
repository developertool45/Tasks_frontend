import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'
import  Login  from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <h1> This is my Task manager</h1>
      <Login />
      <Signup />
      
    </>
  )
}

export default App
