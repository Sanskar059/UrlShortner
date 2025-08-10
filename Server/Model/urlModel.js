import mongoose from "mongoose";

const urlSchema =new mongoose.Schema({
    shortedURL:{
        type : String,
        require :true,
        unique: true
    },
    originalUrl :{
        type : String,
        require :true,
    },
   clicks: {
    type: Number,
    default: 0
  },
    createdBy :{
        type : mongoose.Schema.ObjectId,
        ref : "users"
    }
    

},{timestamp : true});


const urlModel = mongoose.model.Url || mongoose.model("Url", urlSchema);
export default urlModel;