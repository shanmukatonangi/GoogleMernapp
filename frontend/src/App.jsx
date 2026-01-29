import React, { useState } from 'react'
import Profile from './Profile';
import Login from './Login';

const App = () => {

  const [user,setUser]=useState(null);
  console.log("Current user:", user);


  return (
    <div>


      <h1>Google OAuth with MERN Stack</h1>

       {  user ? <Profile user={user} /> : <Login setUser={setUser} />}


      
    </div>
  )
}

export default App
