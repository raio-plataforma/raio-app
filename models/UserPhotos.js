const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserPhotosSchema = new Schema(
  {
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    _userProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professional',
      required: true,
    },
    arquivo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const UserPhotos = mongoose.model('UserPhotos', UserPhotosSchema)
module.exports = UserPhotos
