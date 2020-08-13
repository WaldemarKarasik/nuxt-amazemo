const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword = await bcryptjs.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.comparePasswords = async function(password, cb) {
  // await bcryptjs.compare(password, this.password, (err, isMatch) => {
  //   if (err) {
  //     // console.log(err);

  //     return cb(err, null);
  //   }
  //   // console.log(isMatch);
  //   return cb(null, true);
  // });
  const isMatch = await bcryptjs.compare(password, this.password);
  return cb(isMatch);
};

module.exports = UserSchema;
