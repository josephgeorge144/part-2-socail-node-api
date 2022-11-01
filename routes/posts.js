const router = require("express").Router();

const Posts = require("../models/Post");
//create post
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
  res.status(200).json("hii");
});

//update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    console.log(post.userId);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post is updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json("trhett");
  }
});

//delete_post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    console.log(post.userId);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post is deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json("trhett");
  }
});
//like and dislike

router.put("/:id/like", async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
   
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push:{likes:req.body.userId}});
        res.status(200).json("the post is liked by you");
      } else {
        await post.updateOne({ $pull:{likes:req.body.userId}});
        res.status(200).json("you disliked");
      }
    } catch (err) {
      res.status(500).json("tetiyaloo");
    }
  });

  //getpost
  router.get("/:id", async (req, res) => {
   
    try {
      const post = await Posts.findById(req.params.id)
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }

  });
  
module.exports = router;
