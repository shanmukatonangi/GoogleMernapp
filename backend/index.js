const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const dotenv= require('dotenv').config();

const {OAuth2Client}= require('google-auth-library');
const app= express();
app.use(cors());
app.use(express.json());
const PORT= process.env.PORT || 8888;

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
const User= mongoose.model('User', userSchema);


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
        console.log("Google user info:", {name,email,picture,sub});


        let user=await User.findOne({googleId: sub});
        


   if(!user){
   user= await User.create({
        googleId: sub,
        name:name,
        email:email,
        picture:picture
    });
    res.status(201).json({message:"User created successfully",user});

   }








    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }

})

app.get('/', (req, res)=>{  
    res.send("API is running");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});