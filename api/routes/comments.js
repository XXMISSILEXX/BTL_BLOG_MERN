const router = require("express").Router();
const Comment = require("../models/Comment");
const Post =require("../models/Post");

//CREATE Comment
router.post("/Posts/:id/comments", async (req, res) => {
   /* const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }*/

    //console.log(req.params.id);
    //console.log(req.body);

    const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      const post = await Post.findById(req.params.id);
      post.comments.push(savedComment);             //error
      console.log(post.comments);
      post.save();
      
      res.status(200).json(post);
      //res.redirect("/");
    
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Update Comment
router.put("/comments/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.username === req.body.username) {
        try {
          const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedComment);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your Comment!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE COMMENT
router.delete("/comments/:id", async (req, res) => {
  
    try {
      const comment = await Comment.findById(req.params.id);
        try {
          await comment.delete();
          res.status(200).json("Comment has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }

    } catch (err) {
      res.status(500).json(err);
    }
    
  });

  //GET COMMENT
router.get("/Posts/:id/comments", async (req, res) => {
  const idcomment = req.query.idcomment;
  try {

      const comment = await Comment.find({idcomment});
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET ALL Comments (must get comments depend on post(id__post))
router.get("/Posts/:id/comments", async (req, res) => {
   // const Post_Id = req.params.id_post;
    //console.log(Post_Id);
    const post_id = req.query.post_id;
    const username = req.query.user;
    const content = req.query.content;
    const like = req.query.like;
    const comment_id = req.query.comment_id;
    try {
      
      let comments;
      if (post_id) {
        comments = await Comment.find({ post_id });
      } 
      else if (username) {
        comments = await Comment.find({ username });
      } 
      else if (content) {
        comments = await Comment.find({ content });
      } 
      else if (like) {
        comments = await Comment.find({ like });
      } 
      else if (comment_id) {
        comments = await Comment.find({ comment_id });
      } 
      else {
        comments = await Comment.find();
      }
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
    
  });
  

  module.exports = router;