const mongoose =require("mongoose")
const CommentSchema = new mongoose.Schema(
    {   
        content:{
            type: String ,
            required: true,
        
        },
        /*id_post: {
            type:  mongoose.Schema.Types.ObjectId, ref: "Post",
            required: true,
          },*/
        username: {
            type: String,
            required: true,
          },
        like:{
            type: Number,
            required:false,
        }

 
    },
    { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);