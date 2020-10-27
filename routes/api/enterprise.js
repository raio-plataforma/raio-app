const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')

// Load Input Validation
// const validateRegisterInput = require('../../validator/register')

// Load Enterprise model
const Enterprise = require('../../models/Enterprise')



router.get('/all/count', (req, res) => {
  Enterprise.countDocuments().then(count => {
          res.json({count})
      })
      .catch((err) => {
          console.error(err);
          res.status(404).json({
            jobs: 'Não existe nada cadastrado ainda'
          })
      })
});

router.post('/upload/logotipo', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nehum arquivo encontrado.');
  }

  let fileNameExt = req.files.arquivo.name;
  let fileExt = path.extname(fileNameExt);
  let logotipo = String(req.body._id + fileExt);

  // Use the mv() method to place the file somewhere on your server
  try {
      (req.files.arquivo).mv('upload/logotipo/' + logotipo, async function (err) {
          if (err) {
              console.error(err);
              return res.status(500).send(err);
          }

          console.log(await Enterprise.findOne({_id: req.body._id}))
          
          Enterprise.findOne({_id: req.body._id}).update({ logotipo })
              .then(empresa => {
                console.log(empresa);
                  res.send(`
                  <html>
                  <head>
                      <meta charset="utf-8"/>
                      <meta http-equiv="refresh" content="0; URL='/perfil/editar/empresa'"/>
                      <style>
                          body{
                              background: linear-gradient(101deg, #6f0000 0%, #410114 60%);
                              color: #F9A639!important;
                          }
                      </style>
                  </head>
                  <body>
                      <center>
                          <h1>Arquivo Carregado!</h1>
                          <p>
                              Arquivo carregado, redirecionando de volta, a pagina do usuario, 
                              <a href="/perfil/editar/empresa">Clique aqui caso, queira voltar mais rapido./</a>
                          </p>
                      </center>
                  </body>
                  </html>
                  `);
              })
              .catch((errors) => {
                  console.error(errors);
                  errors.resetPassword = 'Um erro ocorreu ao editar o usuário'
                  return res.status(404).json(errors)
              })
      });
  } catch (error) {
      console.error(error);
      return res.status(400).json(error)
  }
});



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
      res.json(enterprise)
    })
    .catch(() => res.status(404).json({ project: 'Não existe um usuário com esse identificador' }))
})

router.get('/all', (req, res) => {
  const errors = {}
  Enterprise.find().populate('user_id')
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

router.get('/:id', (req, res) => {
  const errors = {}
  Enterprise.findOne({ _id: req.params.id })
    .then(enterprise => {
      if (!enterprise) {
        errors.noEnterprise = `Não foram encontradas empresas com o id ${req.params.id}`
        return res.status(404).json(errors)
      }
      res.json(enterprise)
    })
    .catch(() => res.status(404).json({
      enterprises: 'Não existem candidatos cadastradas ainda'
    }))
})

router.put('/edit/:id/', (req, res) => {
  
  Enterprise.findOneAndUpdate({ _id: req.params.id },
    { $set: {
      enterprise_name: req.body.enterprise_name,
      foundation_date: req.body.foundation_date,
      presentation: req.body.presentation,
      links: req.body.links,
      diversity_functions: req.body.diversity_functions,
      identity_content: req.body.identity_content,
      cnpj_type: req.body.cnpj_type,
      identity_segments: req.body.identity_segments,
      business_segments: req.body.business_segments,
      business_fields: req.body.business_fields,
      other_states: req.body.other_states,
      city: req.body.city,
      state: req.body.state,
      apan_associate: req.body.apan_associate
    }
  },
  { new: true })
  .then(professional => res.json({ message: `Empresa alterada com sucesso`}))
  .catch((errors) => {
    errors.editError = 'Um erro ocorreu ao editar a Empresa'
    return res.status(404).json(errors)
  })
})
module.exports = router
