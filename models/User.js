const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema(
  {
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
    fotoPerfil: {
      type: String,
      default: "SemFoto.png",
      required: true
    },
    type: {
      required: true,
      type: String,
      lowercase: true,
      enum: ['admin', 'professional', 'enterprise']
    },
    phone: {
      type: String
    },
    gender: {
      type: String
    },
    self_declaration: {
      type: String
    },
    reset_password_token: {
      type: Schema.Types.ObjectId,
      auto: true,
      index: true,
      unique: true,
      required: true,
    },
    reset_password_expires: {
      type: Date
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
