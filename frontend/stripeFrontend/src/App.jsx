
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Success from './Success';
import Cancel from './Cancel';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/cancel' element={<Cancel/>}/>
    </Routes>
    </>
  )
}

export default App
