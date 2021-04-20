var express = require('express');
var router = express.Router();
const Project = require('../models/project')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await Project.find());
});

router.get('/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    if(myProject)
        res.send(myProject);
    else
        res.send('0');
  });
  router.get('/taskstodo/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    if(myProject)
        res.send(myProject.tasks_ToDo);
    else
        res.send('0');
  });

router.post('/', function(req, res, next) {
    console.log(req.body)
    if(req.body.title && req.body.topic && req.body.tasks_ToDo && req.body.tasks_Done && req.body.tasks_Doing)
        {
            const newProject = new Project(req.body)
            console.log(newProject)
            newProject.save()
        }
    res.send('respond with a resource');
});

router.delete('/:id', async function(req, res, next) {
    res.send(await Project.findByIdAndDelete(req.params.id));
});

router.put('/:id', function(req, res, next) {
    if(req.body.title && req.body.topic && req.body.tasks_ToDo && req.body.tasks_Done && req.body.tasks_Doing)
        {
            Project.findByIdAndUpdate(req.params.id,req.body).exec()
        }
    res.send('respond with a resource');
});

module.exports = router;
