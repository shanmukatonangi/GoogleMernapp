import axios from 'axios';
import React from 'react'

const Profile = ({user}) => {
  const [file,setFile]=React.useState(null);
  const [photos,setPhotos]=React.useState([]);
    console.log(user.picture)

async function Upload(){
  const formData=new FormData();
  formData.append("photo",file);
  formData.append("email",user.email);

  await axios.post("http://localhost:8888/upload",formData)
  fetchPhotos()

}

async function fetchPhotos(){
  const res= await axios.get(`http://localhost:8888/photos/${user.email}`);
  setPhotos(res.data.photos);
  
}
fetchPhotos();


    function Logout(){
      user=null;
       console.log("User logged out:", user);
    }
  return (
    <div>
       <img src={user.picture} alt="Profile" />
       <h2>{user.name}</h2>
       <p>{user.email}</p>
       <button onClick={Logout}>Logout</button>

       <input type="file" onChange={(e)=> setFile(e.target.files[0])}  />
       <button onClick={Upload}>upload</button>

       {photos.map(photo=>(
        <div key={photo._id}>
          <img src={photo.imageUrl} alt="User Photo" style={{width:"200px"}} />
        </div>
       ))}
      
    </div>
  )
}

export default Profile
