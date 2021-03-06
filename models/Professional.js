const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfessionalSchema = new Schema(
  {
    user_id: {
      required: true,
      unique: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    user_email: {
      required: true,
      unique: true,
      type: Schema.Types.String,
      ref: 'User'
    },
    pcd: {
      type: Boolean,
    },
    birthday: {
      type: String,
      required: true
    },
    home_state: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    education: {
      type: String,
    },
    formation_institution: {
      type: String,
    },
    ano_formacao: {
      type: String,
    },
    cnpj: {
      type: Boolean,
    },
    cnpj_type: {
      type: String,
    },
    cnpj_number: {
      type: String,
    },
    identity_content: {
      type: Boolean,
    },
    identity_segments: {
      type: Array,
    },
    expertise_areas: {
      type: Array,
      required: true
    },
    apan_associate: {
      type: Boolean,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    links: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    strict: false
  }
)


const Professional = mongoose.model('Professional', ProfessionalSchema)

module.exports = Professional
