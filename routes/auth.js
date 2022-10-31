const router = require("express").Router();
const { hash } = require("bcrypt");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/reg", async (req, res) => {
  try {
    //create encrypted pw
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    // createw user
    const data = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user in db and response on page
    const user = await data.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    // if(user){
    //     res.status(200).send('login details found')
    // }
    !validPassword && res.status(400).json('wrong password')
    !user && res.status(404).send("user not found");

    res.status(200).send(user)
    console.log(user);
  } catch(err) {

    res.status(500).json(err);

  }
});

module.exports = router;
