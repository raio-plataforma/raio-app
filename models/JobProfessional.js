const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const JobProfesssionalSchema = new Schema({
  _job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
{ strict: false})

const JobProfesssional = mongoose.model('JobProfesssional', JobProfesssionalSchema)
module.exports = JobProfesssional
