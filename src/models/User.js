const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//cifro
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); 
  return await bcrypt.hash(password, salt);
};
//comparo dos password cifradas
//use function y no () => {} porque con function se puede ingresar al this de UserSchema 
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);