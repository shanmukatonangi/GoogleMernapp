import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import axios from 'axios'


const Login = ({setUser}) => {


    async function HandleSuccess(googleData){
        try {
            const res= await axios.post('http://localhost:8888/auth/google',{
                tokenId: googleData.credential
            })
            console.log("Login response:", res.data);

            setUser(res.data.user);
            console.log(user)
            
        } catch (error) {
            console.log("Login error:", error);
            
        }
    }

  return (
    <div>
        <GoogleLogin onSuccess={HandleSuccess} />
      
    </div>
  )
}

export default Login
