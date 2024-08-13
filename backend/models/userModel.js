import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
        },
        slug:{
            type:String,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            
        },
        productPictures: [{ img: { type: String } }],
    }
)
export default mongoose.model("Users", userSchema);