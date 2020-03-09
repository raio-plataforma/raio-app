const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
// const validateRegisterInput = require('../../validator/register')

// Load Enterprise model
const Enterprise = require('../../models/Enterprise')
const Job = require('../../models/Job')

// @route   POST api/enterprise/register
// @desc    Register Enterprise
// @access  Public
router.post('/register', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body)

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors)
    // }

    if (req.user) {
      // Create new company
      const newEnterprise = new Enterprise({
        user_id: req.user.id,
        user_email: req.user.email,
        name: req.body.name,
        enterprise_name: req.body.enterprise_name,
        foundation_date: req.body.foundation_date,
        presentation: req.body.presentation,
        links: req.body.links,
        diversity_functions: req.body.diversity_functions,
        identity_content: req.body.identity_content,
        cnpj_type: req.body.cnpjType,
        identity_segments: req.body.identity_segments,
        business_segments: req.body.business_segments,
        business_fields: req.body.business_fields,
        other_states: req.body.other_states,
        city: req.body.city,
        state: req.body.state,
        apan_associate: req.body.apan_associate
      })

      newEnterprise
        .save()
        .then(enterprise => res.json(enterprise))
        .catch(err => console.log(err))

    } else {
      errors.user = 'Usuário não encontrado para a criação da empresa'
      return res.status(400).json(errors)
    }
  })

// @route   GET api/enterprise/
// @desc    Get enterprise by id
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Enterprise.findOne({ user_id: req.user.id })
  .then(enterprise => {
    if (!enterprise) {
      errors.noenterprise = 'Essa empresa não existe'
      res.status(404).json(errors)
    }
    const usedVacancies = Job.count({ enterprise_id: enterprise.user_id})
      
      res.json(enterprise)
    })
    .catch(() => res.status(404).json({ project: 'Não existe um usuário com esse identificador' }))
})

router.get('/all', (req, res) => {
  const errors = {}
  Enterprise.find()
    .sort({ createdAt: -1 })
    .then(enterprises => {
      if (!enterprises) {
        errors.enterprises = 'Não existem empresas cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(enterprises)
    })
    .catch(() => res.status(404).json({
      enterprises: 'Não existem empresas cadastradas ainda'
    }))
})

router.put('/:enterprise_id', passport.authenticate('jwt', { session: false }), async (req, res) => {


  try {
    const enterprise = await Enterprise.findOneAndUpdate(req.params.enterprise_id, {...req.body}, { new: true });

    await enterprise.save();

    return res.send({
      enterprise
    });
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao atualizar a empresa',
    });
  }
});

module.exports = router
