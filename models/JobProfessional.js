const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const JobProfesssionalSchema = new Schema(
  {
    _job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Inscrito',
      enum: ['Inscrito', 'Triagem de perfil', 'Validação  tech', 'Validade de disponibilidade', 'Top', 'Contratado']
    },
  },
  {
    timestamps: true,
    strict: false
  }
)

const JobProfesssional = mongoose.model('JobProfesssional', JobProfesssionalSchema)
module.exports = JobProfesssional
