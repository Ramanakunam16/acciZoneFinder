const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "user with given email already exit" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.passwd, salt);
    console.log(hashPassword);
    new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error " + error });
  }
});

module.exports = router;
