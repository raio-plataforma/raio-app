const express = require('express')
const router = express.Router()
const passport = require('passport')

const states = require('../../client/src/assets/states.json');

// Load Input Validation
// const validateRegisterInput = require('../../validator/register')
// Load professional model
const Professional = require('../../models/Professional')
const User = require('../../models/User')

// @route   POST api/professional/register
// @desc    Register professional
// @access  Public
router.post('/register', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        let errors = {}

        // // Check Validation
        // if (!isValid) {
        //   return res.status(400).json(errors)
        // }

        Professional.findOne({user_id: req.user.id})
            .then(professional => {
                if(professional)
                {
                    errors.user = 'Esse usuário já possui um cadastro.'
                    return res.status(400).json(errors)
                }
                else
                {
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
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    Professional.findOne({user_id: req.user.id})
        .then(professional => {
            if(!professional)
            {
                errors.noprofessional = 'Esse profissional não existe'
                res.status(404).json(errors)
            }
            res.json(professional)
        })
        .catch(() => res.status(404).json({project: 'Não existe um usuário com esse identificador'}))
})

// @route   GET api/professional/all
// @desc    Get professionals
// @access  Public
router.post('/all', async(req, res) => {
    const errors = {}
    const {
        expertise_areas,
        company_registry,
        gender,
        home_state,
        pcd,
        self_declaration,
    } = req.body;

    try
    {
        const professionalsFilter = {};

        let user_ids;

        if((Array.isArray(gender) && gender.length > 0) || (Array.isArray(self_declaration) && self_declaration.length > 0))
        {
            const userFilter = {};
            if(Array.isArray(self_declaration) && self_declaration.length > 0)
            {
                userFilter.self_declaration = {$in:self_declaration};
            }

            if(Array.isArray(gender) && gender.length > 0)
            {
                userFilter.gender = {$in:gender};
            }
            const users = await User.find(userFilter);

            user_ids = users.map((u) => u._id)
            if(user_ids.length === 0)res.status(200).json([])
        }

        if(expertise_areas.length > 0) professionalsFilter.expertise_areas = {$in: expertise_areas};
        if(company_registry) professionalsFilter.cnpj = true;
        if(pcd) professionalsFilter.pcd = true;
        if(home_state && home_state.length > 0)
        {
            const statesFilter = home_state.map(
                stateAbbr => states.find(s => s.abbr === stateAbbr).id
            );
            professionalsFilter.state = {$in: statesFilter};
        }

        if(user_ids && user_ids.length > 0)professionalsFilter.user_id = {$in: user_ids};

        const professionals = await Professional.find(professionalsFilter).populate('user_id').sort({ createdAt: -1 })

        res.status(200).json(professionals)
    }
    catch(e)
    {
        res.status(404).json([]);
    }
})

router.get('/:id', (req, res) => {
    const errors = {}
    let id = req.params.id;
    Professional.findOne({$or: [{_id: id}, {user_id: id}]})
        .then(professionals => {
            if(!professionals)
            {
                errors.noprofessionals = `Não foram encontrados profissionais com o id ${id}`
                return res.status(404).json(errors)
            }
            res.json(professionals)
        })
        .catch((err) => res.status(404).json({
            professionals: 'Não existem profissionais cadastrados ainda',
            err
        }))
})

router.put('/edit/:id/', (req, res) => {

    Professional.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
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
            }
        },
        {new: true})
        .then(professional => res.json({message: `Profissional alterado com sucesso`}))
        .catch((errors) => {
            errors.editError = 'Um erro ocorreu ao editar o Profissional'
            return res.status(404).json(errors)
        })
})

module.exports = router
