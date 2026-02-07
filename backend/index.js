const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const dotenv= require('dotenv').config();

const {OAuth2Client}= require('google-auth-library');
const app= express();
app.use(cors());
app.use(express.json());
const PORT= process.env.PORT || 8888;
const multer= require('multer');
const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}= require("multer-storage-cloudinary");

connectDB().catch(err=> console.log(err));
async function connectDB(){
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");
}

const userSchema=new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    picture: String
})

const photoSchema= new mongoose.Schema({
    userEmail: String,
    imageUrl: String,
    uploadedAt: {type: Date, default: Date.now}
})

const User= mongoose.model('User', userSchema);
const Photo= mongoose.model('Photo', photoSchema);


cloudinary.config({
    cloud_name: "deffm8g7g",
    api_key:"838246546813712" ,
    api_secret: "YX1AtJ3sf80tDnTX0gKGyxyhVRs"
});

const storage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"photosmernapp",
        allowedFormats:["jpg","png","jpeg"]
    }
})

const upload= multer({storage});



// #838246546813712 - apikey

// YX1AtJ3sf80tDnTX0gKGyxyhVRs

// deffm8g7g
const googleClient= new OAuth2Client("1040355926451-c3arkncedlbr3cchc14q72ri02kv8l50.apps.googleusercontent.com");


app.post("/auth/google",async(req,res)=>{
    try{
        const {tokenId}= req.body;
        console.log("Token ID:", tokenId);
        const ticket=await googleClient.verifyIdToken({
            idToken:tokenId,
            audience: "1040355926451-c3arkncedlbr3cchc14q72ri02kv8l50.apps.googleusercontent.com"
        })
        const {name,email,picture,sub}= ticket.getPayload();
        


        let user=await User.findOne({googleId: sub});
        console.log(user)


        if(!user){
   user= await User.create({
        googleId: sub,
        name:name,
        email:email,
        picture:picture
    });
    

   }
   res.status(201).json({message:"User created successfully",user});








    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }

})


app.post("/upload",upload.single("photo"),async(req,res)=>{
    const photo=await Photo.create({
        userEmail: req.body.email,
        imageUrl: req.file.path
    })
    res.status(201).json({message:"Photo uploaded successfully", photo})
})

app.get("/photos/:email", async(req,res)=>{
    const photos= await Photo.find({userEmail: req.params.email}).sort({uploadedAt:-1});
    res.status(200).json({photos});
})

app.get('/', (req, res)=>{  
    res.send("API is running");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});