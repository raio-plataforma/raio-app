const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')

const Job = require('../../models/Job')
const JobProfessional = require('../../models/JobProfessional')
const Enterprise = require('../../models/Enterprise')
const Professional = require('../../models/Professional')
const User = require('../../models/User')

const emailFuncs = require('../../helpers/mail');
const sendEmailNewJobApply = emailFuncs.sendEmailNewJobApply;

const states = require('../../client/src/assets/states.json');

router.get('/all/count', (req, res) => {
    let finQuery = {};
    let enterprise_id = req.query.enterprise_id;
    let status = req.query.status;
    if(status != ""){
        finQuery.status = status;
    }else
    if(enterprise_id != ""){
        finQuery.enterprise_id = enterprise_id;
    }

    Job.countDocuments(finQuery).then(count => {
            res.json({count})
        })
        .catch((err) => {
            console.error(err);
            res.status(404).json({
                jobs: 'Não existe nada cadastrado ainda'
            })
        })
});


router.get('/myJobs/all/count', (req, res) => {
    JobProfessional.countDocuments({ _user: req.query.userId }).then(count => {
            res.json({count})
        })
        .catch((err) => {
            console.error(err);
            res.status(404).json({
                jobs: 'Não existe nada cadastrado ainda'
            })
        })
});

// @route   GET api/job/all
// @desc    Get jobs
// @access  Public
router.get('/all', (req, res) => {
    let findQuery = {};
    if (req.query.status) {
        findQuery = { status: req.query.status };
    }

    Job.find(findQuery).populate('enterprise_id').populate('top1').populate('top2').populate('top3')
        .sort({ createdAt: -1 })
        .then(jobs => {
            if (!jobs) {
                errors.nojobs = 'Não existem vagas cadastradas ainda'
                return res.status(404).json(errors)
            }
            res.json(jobs)
        })
        .catch((err) => {
            console.error(err);
            res.status(404).json({
                jobs: 'Não existem vagas cadastradas ainda'
            })
        })
})

// @route   GET api/job/:enterprise_id/all
// @desc    Get all specific enterprise jobs
// @access  Public
router.get('/all/:enterprise_id', (req, res) => {
    Job.find({ enterprise_id: req.params.enterprise_id })
        .sort({ createdAt: -1 })
        .then(jobs => {
            if (!jobs) {
                return res.status(404).json({
                    jobs: 'Essa empresa ainda não publicou vagas'
                })
            }
            res.json(jobs)
        })
        .catch(() => res.status(404).json({
            jobs: 'Essa empresa ainda não publicou vagas'
        }))
})

// @route   GET api/job/:enterprise_id/all
// @desc    Get all specific enterprise jobs
// @access  Public
router.post('/all/:enterprise_id', async (req, res) => {
    const errors = {}
    const {
        expertise_areas,
        company_registry,
        gender,
        home_state,
        pcd,
        self_declaration,
    } = req.body;

    const filters = { enterprise_id: req.params.enterprise_id };

    Job.find(filters)
        .sort({ createdAt: -1 })
        .then(jobs => {
            if (!jobs) {
                return res.status(404).json({
                    jobs: 'Essa empresa ainda não publicou vagas'
                })
            }
            res.json(jobs)
        })
        .catch(() => res.status(404).json({
            jobs: 'Essa empresa ainda não publicou vagas'
        }))
})

// @route   GET api/job/
// @desc    Return all company jobs
// @access  Private

router.get('/', async (req, res) => {
    const errors = {}
    const {
        expertise_areas,
        home_state
    } = req.query;

    try {
        console.log(req.query)
        const filters = {};

        if (expertise_areas && expertise_areas.length > 0) filters.function = { $in: expertise_areas };
        if (home_state && home_state.length > 0) {
            const statesFilter = home_state.map(
                stateAbbr => states.find(s => s.abbr === stateAbbr).id
            );
            filters.state = { $in: statesFilter };
        }

        var jobs = await Job.find(filters).sort({ 'createdAt': 'desc' }).populate('company').populate('enterprise_id');

        if (req.query.userId) {
            jobs.forEach(async (obj, index) => {
                let myJobs = await JobProfessional.find({ $and: [{ _user: req.query.userId }, { _job: jobs[index]["_id"] }] }).sort({ 'createdAt': 'desc' }).populate('_user').populate('_job');
                if (String(myJobs[0]) !== "undefined") {
                    jobs[index].set("btnCandidateSe", "false");
                } else {
                    jobs[index].set("btnCandidateSe", "true");
                }
            })

            setTimeout(async () => {
                return res.status(200).json(jobs);
            }, 1000);

        } else {
            return res.status(200).json(jobs);
        }

    }
    catch (err) {
        console.log(err)
        res.status(400).send({
            error: ' Erro ao carregar as vagas',
        });
    }
});

// @route   GET api/job/:jobId
// @desc    Return one company job
// @access  Private
router.get('/:jobId', passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        try {
            const job = await Job.findById(req.params.projectId).populate('company');

            return res.send({
                job
            });
        }
        catch (err) {
            res.status(400).send({
                error: ' Erro ao carregar as vagas',
            });
        }
    });


// @route   POST api/job/
// @desc    Create new job
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    Enterprise.findOne({ user_id: req.user.id })
        .then(enterprise => {
            if (enterprise) {
                let randomNumber = Math.floor((Math.random() * 9999) + 1);
                let slug = enterprise.enterprise_name + "-" + req.body.title + "-" + randomNumber;
                slug = String(slug).toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

                const newJob = new Job({
                    enterprise_id: enterprise.id,
                    enterprise_name: enterprise.enterprise_name,
                    title: req.body.title,
                    slug: slug,
                    function: req.body.function,
                    requirements: req.body.requirements,
                    city: req.body.city,
                    state: req.body.state,
                    stateName: req.body.stateName,
                    cache: req.body.cache,
                    total_period: req.body.total_period,
                    hiring_type: req.body.hiring_type,
                    status: req.body.status,
                    sumirNomeEmpresa: req.body.sumirNomeEmpresa
                })

                newJob
                    .save()
                    .then(job => res.status(200).json(job))
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ job: 'Erro ao salvar vaga', err })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                job: 'Erro ao encontrar uma empresa para esse usuário',
            });
        })
});

// @route   POST api/job/apply
// @desc    Create new job
// @access  Private
router.post('/apply', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // console.log(req.body.id)

    const existing = await JobProfessional.findOne({ _job: req.body.id, _user: req.body.user_id }).populate('_user').populate('_job');
    if (existing) return res.status(200).json(existing)

    Job.findOne({ _id: req.body.id }).then(job => {
        // console.log(job)

        User.findOne({ _id: req.body.user_id }).then(user => {
            // console.log(user)

            const jobProf = new JobProfessional({
                _job: req.body.id,
                _user: req.body.user_id
            })

            jobProf
                .save()
                .then(jobProfessional => {
                    // console.log(jobProf)
                    JobProfessional.findOne({ _id: jobProf._id }).populate('_user').populate('_job').then(jp => {
                        sendEmailNewJobApply(jp);

                        return res.status(200).json(jp)
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ jobProfessional: 'Erro ao salvar cadastro', err })
                })
        })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    jobProfessional: 'Profissional não encontrado',
                });
            })
    })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                jobApply: 'Vaga não encontrada',
            });
        })
});

// @route   GET api/job/myjobs/:userId
// @desc    Return all company jobs
// @access  Private
router.get('/myjobs/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // console.log(req.params)
        const jobs = await JobProfessional.find({ _user: req.params.userId }).sort({ 'createdAt': 'desc' }).populate('_user').populate('_job')
        // console.log(jobs)

        return res.status(200).json(jobs);
    }
    catch (err) {
        res.status(400).send({
            error: ' Erro ao carregar as vagas',
        });
    }
});

router.get('/candidaturas/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // console.log(req.params)
        const jobs = await JobProfessional.find({ _job: req.params.jobId }).sort({ 'createdAt': 'desc' }).populate('_user').populate({
            path: '_job',
            populate: { path: 'top1' },
            populate: { path: 'top2' },
            populate: { path: 'top3' }
          })
        // console.log(jobs)

        return res.status(200).json(jobs);
    }
    catch (err) {
        console.error(err);
        res.status(400).send({
            error: ' Erro ao carregar as vagas',
            err
        });
    }
});

// @route   GET api/job/myjobs/:userId
// @desc    Return all company jobs
// @access  Private
router.delete('/myjobs/:jobProfId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await JobProfessional.findByIdAndDelete(req.params.jobProfId);

        return res.send();
    }
    catch (err) {
        console.log(err)
        res.status(400).send({
            error: ' Erro ao deletar candidatura',
        });
    }
});


// @route   PUT api/job/:jobId
// @desc    Update a job
// @access  Private
router.put('/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {

    // const { name, occupation } = req.body; //this is example TO DO add all

    try {
        const job = await Job.findOneAndUpdate({ _id: req.params.jobId }, req.body, { new: true });

        await job.save();

        return res.send({
            job
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).send({
            error: ' Erro ao carregar a vaga',
        });
    }
});


// @route   DELETE api/job/:jobId
// @desc    Update  job
// @access  Private
router.post('/:jobId', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.jobId);

        return res.send();
    }
    catch (err) {
        res.status(400).send({
            error: ' Erro ao deletar a vaga',
        });
    }
})

module.exports = router
