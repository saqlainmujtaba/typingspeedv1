import './App.css'
import Wrapper from './Components/Wrapper'
function App() {

  return (
    <>
    <header>
    <h1>Typing Streak</h1>
  </header>
     <Wrapper/>
      <footer>
    &copy; {new Date().getFullYear()} Typing Streak. Developed by Saqlain Mujtaba.
  </footer>
    </>
  )
}

export default App
