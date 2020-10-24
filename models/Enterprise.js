const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EnterpriseSchema = new Schema(
  {
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    user_email: {
      required: true,
      type: Schema.Types.String,
      ref: 'User'
    },
    enterprise_name: {
      type: String,
      required: true
    },
    name: {
      type: Schema.Types.String,
      required: false,
      ref: 'User'
    },
    logotipo: {
      type: String,
      default: "SemLogo.png",
      required: true
    },
    foundation_date: {
      type: String,
      required: true
    },
    presentation: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: true
    },
    diversity_functions: {
      type: Array,
      required: true
    },
    identity_content: {
      type: Boolean,
      required: true,
    },
    identity_segments: {
      type: Array,
      required: false
    },
    cnpj_type: {
      type: String,
      required: true
    },
    business_segments: {
      type: Array,
      required: true,
    },
    business_fields: {
      type: Array,
      required: true
    },
    apan_associate: {
      type: Boolean,
      required: true
    },
    other_states: {
      type: Array,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    vacancies: {
      type: Number,
      default: 0
    },
    usedVacancies: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const Enterprise = mongoose.model('Enterprise', EnterpriseSchema)

module.exports = Enterprise
