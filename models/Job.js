const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
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
    level: {
        type: String,
        required: true
    },
    travel: {
        type: Boolean,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
