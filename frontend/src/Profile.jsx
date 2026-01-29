import React from 'react'

const Profile = ({user}) => {
    console.log(user.picture)
  return (
    <div>
       <img src={user.picture} alt="Profile" />
       <h2>{user.name}</h2>
       <p>{user.email}</p>
      
    </div>
  )
}

export default Profile
