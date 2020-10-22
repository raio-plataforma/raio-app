const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const JobSchema = new Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      auto: true,
      required: true,
    },
    enterprise_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enterprise',
      required: true,
    },
    enterprise_name: {
      type: Schema.Types.String,
      ref: 'Enterprise',
      required: true
    },
    status: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    slug: {
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
    state: {
      type: String,
      required: true,
    },
    stateName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true
    },
    hiring_type: {
      type: Array,
      required: true,
    },
    cache: {
      type: String,
      required: true
    },
    total_period: {
      type: String,
      required: true
    },
    top1: {
      type: String
    },
    top2: {
      type: String
    },
    top3: {
      type: String
    },
    comentarioTop1: {
      type: String
    },
    comentarioTop2: {
      type: String
    },
    comentarioTop3: {
      type: String
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
