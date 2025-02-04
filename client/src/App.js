import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { useState, useEffect } from 'react';

import AppNavbar from './components/AppNavbar.js';
import Home from './pages/Home.js'
import Blogs from './pages/Blogs.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import AdminDashboard from './pages/AdminDashboard.js';
import Profile from './pages/Profile.js';



function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

 // function for clearing out localStorage on logout
  function unsetUser(){
      localStorage.clear()
  }

  useEffect(() => {
    fetch('https://s86-s88-backend-api.onrender.com/api/auth/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(typeof data !== "undefined")

      if (typeof data !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      } else {

        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])

  useEffect(() => {
    console.log(user);
    console.log(localStorage)
  }, [user]);

  return (
    <>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/posts" element={<Blogs/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/admin" element={<AdminDashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
