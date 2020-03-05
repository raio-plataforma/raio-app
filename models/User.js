const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    required: true,
    type: String,
    lowercase: true,
    enum: ['admin', 'professional', 'enterprise']
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  self_declaration: {
    type: String,
    required: true
  },
  reset_password_token: {
    type: String,
    unique: true
  },
  reset_password_expires: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
