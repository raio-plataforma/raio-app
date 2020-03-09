const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const JobSchema = new Schema({
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: false,
  },
  enterprise_name: {
    type: Schema.Types.String,
    ref: 'Enterprise',
    required: false
  },
  title: {
    type: String,
    required: true
  },
  function: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  hiring_type: {
    type: String,
    required: true,
    enum: ['CLT', 'PJ', 'RPA']
  }, 
  cache: {
    type: String,
    required: true
  },
  total_period: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
})

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
