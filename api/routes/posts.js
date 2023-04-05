const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
   const post = await Post.findById(req.params.id).populate('comments');
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const titleName = req.query.title;
  const fromDate = req.query.from; // format: yyyy-mm-dd
  const toDate = req.query.to; // format: yyyy-mm-dd
  const sort = req.query.sort || 'desc';
  try {
    let query = {};
    let posts;

    if (username) {
      query.username = username;
    }
    if (catName) {
      query.categories = { $in: [catName] };
    }
    if (titleName) {
      query.title = { $regex: titleName, $options: "i" };
    }
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) {
        query.createdAt.$gte = new Date(fromDate);
      }
      if (toDate) {
        query.createdAt.$lte = new Date(toDate);
      }
    }

    posts = await Post.find(query).sort({ createdAt: sort }); // sort by createdAt field based on sort parameter
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   const titleName =req.query.title;
//   const fromDate = req.query.from; // format: yyyy-mm-dd
//   const toDate = req.query.to; // format: yyyy-mm-dd
//   try {
//     let posts;
//     if (username) {
//       posts = await Post.find({ username });
//     }
//      else if (catName) {
//       posts = await Post.find({
//         categories: {
//           $in: [catName],
//         },
//       });
//     }
//     else if (titleName) {
//       posts = await Post.find({
//         title: { $regex: titleName, $options: "i" }, // case-insensitive search
//       });
    
//     }
//     else if (fromDate || toDate) {
//       query.createdAt = {};
//       if (fromDate) {
//         query.createdAt.$gte = new Date(fromDate);
//       }
//       if (toDate) {
//         query.createdAt.$lte = new Date(toDate);
//       }
//       posts = await Post.find(query);
//     }
//      else {
//       posts = await Post.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// GET ALL POSTS
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   const titleName = req.query.title;
//   const fromDate = req.query.from; // format: yyyy-mm-dd
//   const toDate = req.query.to; // format: yyyy-mm-dd
//   try {
//     let posts;
//     let query = {};

//     if (username) {
//       query.username = username;
//     }

//     if (catName) {
//       query.categories = { $in: [catName] };
//     }

//     if (titleName) {
//       query.title = { $regex: titleName, $options: "i" };
//     }

//     if (fromDate || toDate) {
//       query.createdAt = {};
//       if (fromDate) {
//         query.createdAt.$gte = new Date(fromDate);
//       }
//       if (toDate) {
//         query.createdAt.$lte = new Date(toDate);
//       }
//     }

//     posts = await Post.find(query);
//     console.log(posts);
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
