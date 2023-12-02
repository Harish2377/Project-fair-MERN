
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { tokenAuthorisationContext } from './contexts/TokenAuth';




function App() {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthorisationContext)

  return (
    <>

      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/projects' element={ isAuthorised? <Projects/>:<Home/> } />
        <Route path='/dashboard' element={ isAuthorised? <Dashboard/>:<Home/> } />
        <Route path='/*' element={<Navigate to={'/'}/>} />
        
      </Routes>

      <Footer/>

      
    </>
  );
}

export default App;
