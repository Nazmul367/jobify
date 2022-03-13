import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 20,
    minlength: 3,
    trim: true
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'lastName'
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    // minlength: 6,
    select: false
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city'
  }
})

// hash password
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

export default mongoose.model('User', UserSchema)