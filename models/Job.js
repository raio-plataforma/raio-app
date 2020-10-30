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
      required: true,
      default: "Aguardando pagamento",
      enum: ["Aguardando pagamento", "Atraindo candidatos", "Aguardando seleção", "Candidatos selecionados", "Fechada", "Arquivada", "Pagamento negado"]
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
    sumirNomeEmpresa: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    strict: false
  }
)

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
