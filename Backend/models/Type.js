import mongoose from 'mongoose';

const TypeSchema = new mongoose.Schema({
    type:{
        type: String,
        required:true
    }
})

export default mongoose.model("Type",TypeSchema);