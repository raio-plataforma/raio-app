const express = require('express')
const router = express.Router()
const passport = require('passport')

const Job = require('../../models/Job')
const Enterprise = require('../../models/Enterprise')

// @route   GET api/job/all
// @desc    Get jobs
// @access  Public
router.get('/all', (req, res) => {
  Job.find()
    .sort({ createdAt: -1 })
    .then(jobs => {
      if (!jobs) {
        errors.nojobs = 'Não existem vagas cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(jobs)
    })
    .catch(() => res.status(404).json({
      jobs: 'Não existem vagas cadastradas ainda'
    }))
})

// @route   GET api/job/:enterprise_id/all
// @desc    Get all specific enterprise jobs
// @access  Public
router.get('/all/:enterprise_id', (req, res) => {
  Job
    .find({ enterprise_id: req.params.enterprise_id })
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

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const job = await Job.find().populate('company');

    return res.status(200).json(job);
  }
  catch (err) {
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
        const newJob = new Job({
          enterprise_id: enterprise.id,
          enterprise_name: enterprise.name,
          title: req.body.title,
          function: req.body.function,
          requirements: req.body.requirements,
          location: req.body.location,
          cache: req.body.cache,
          total_period: req.body.total_period,
          hiring_type: req.body.hiring_type
        })
    
        newJob
          .save()
          .then(job => res.json(job))
          .catch(err => {
            console.log(err)
            res.status(500).json({ job: 'Erro ao salvar vaga' })
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


// @route   PUT api/job/:jobId
// @desc    Update a job
// @access  Private
router.put('/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {

  const { name, occupation } = req.body; //this is example TO DO add all 

  try {
    const job = await Job.findOneAndUpdate(req.params.jobId, { name, occupation }, { new: true });

    await job.save();

    return res.send({
      job
    });
  }
  catch (err) {
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
