const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

// Define pre-hook to update associated posts' usernames
UserSchema.pre('save', async function(next) {
  const updatedUsername = this.username;
  const posts = await Post.find({ username: this.username });
  
  // Update all posts with the new username
  await Promise.all(posts.map(post => {
    post.username = updatedUsername;
    return post.save();
  }));

  next();
});


module.exports = mongoose.model("User", UserSchema);
