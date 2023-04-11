const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const updatedUser = {};
      if (req.file && !req.file.filename) {
        return res.status(400).json("Invalid file");
      }
      if (req.file) {
        updatedUser.profilePic = req.file.filename;
      }
      if (req.body.username) {
        updatedUser.username = req.body.username;
      }
      if (req.body.email) {
        updatedUser.email = req.body.email;
      }
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(req.body.password, salt);
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updatedUser },
        { new: true }
      );

      if (!user) {
        return res.status(404).json("User not found");
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json("Something went wrong");
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("You can update only your account!");
//   }
// });

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
