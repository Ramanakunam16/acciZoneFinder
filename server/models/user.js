const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userShema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
});

userShema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
const User = mongoose.model("user", userShema);

const validate = (data) => {
  console.log(data);
  const schema = joi.object({
    name: joi.string().required().label("Full name"),
    email: joi.string().required().label("Email"),
    phone: joi.string().required().label("Phone"),
    passwd: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
module.exports = { User, validate };
