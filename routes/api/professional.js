const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
// const validateRegisterInput = require('../../validator/register')
// Load professional model
const Professional = require('../../models/Professional')

// @route   POST api/professional/register
// @desc    Register professional
// @access  Public
router.post('/register', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {}

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors)
    // }

    Professional.findOne({ user_id: req.user.id })
      .then(professional => {
        if (professional) {
          errors.user = 'Esse usuário já possui um cadastro.'
          return res.status(400).json(errors)
        } else {
          const newProfessional = new Professional({
            user_id: req.user.id,
            user_email: req.user.email,
            birthday: req.body.birthday,
            pcd: req.body.pcd,
            home_state: req.body.home_state,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            education: req.body.education,
            formation_institution: req.body.formation_institution,
            cnpj: req.body.cnpj,
            cnpj_type: req.body.cnpj_type,
            identity_content: req.body.identity_content,
            identity_segments: req.body.identity_segments,
            expertise_areas: req.body.expertise_areas,
            apan_associate: req.body.apan_associate,
            links: req.body.links,
            bio: req.body.bio,
          })

          newProfessional
            .save()
            .then(professional => res.json(professional))
            .catch(err => res.status(400).json(err))
        }
      })
      .catch(err => res.status(400).json(err))
  })

// @route   GET api/professional/
// @desc    Get professional by id
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Professional.findOne({ user_id: req.user.id })
    .then(professional => {
      if (!professional) {
        errors.noprofessional = 'Esse profissional não existe'
        res.status(404).json(errors)
      }
      res.json(professional)
    })
    .catch(() => res.status(404).json({ project: 'Não existe um usuário com esse identificador' }))
})

// @route   GET api/professional/all
// @desc    Get professionals
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}
  Professional.find()
    .sort({ createdAt: -1 })
    .then(professionals => {
      if (!professionals) {
        errors.noprofessionals = 'Não existem candidatos cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(professionals)
    })
    .catch(() => res.status(404).json({
      professionals: 'Não existem candidatos cadastradas ainda'
    }))
})

router.get('/:id', (req, res) => {
  const errors = {}
  Professional.findOne({ user_id: req.params.id })
    .then(professionals => {
      if (!professionals) {
        errors.noprofessionals = 'Não existem candidatos cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(professionals)
    })
    .catch(() => res.status(404).json({
      professionals: 'Não existem candidatos cadastradas ainda'
    }))
})

module.exports = router
