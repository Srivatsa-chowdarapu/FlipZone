import mongoose from 'mongoose';

const NameSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    },  
    price:{
        type: Number,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    size:{
        type:[String],
        required:true
    },
    color:{
        type:[String],
        required:true
    },
    img:{
        type:String,
    }
},{timestamps:true});

export default mongoose.model("Name",NameSchema);