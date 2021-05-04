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
  router.get('/tasksdoing/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    if(myProject)
        res.send(myProject.tasks_Doing);
    else
        res.send('0');
  });
  router.get('/tasksdone/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    if(myProject)
        res.send(myProject.tasks_Done);
    else
        res.send('0');
  });
  router.put('/todo_todoing/:id/:task', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    const taskindex =   myProject.tasks_ToDo.indexOf(req.params.task);
    if(taskindex != -1)
    {
        myProject.tasks_Doing.push(myProject.tasks_ToDo[taskindex]);
        myProject.tasks_ToDo = myProject.tasks_ToDo.filter((task)=>task !== req.params.task )
        myProject.save();
    }

    res.send('respond with a resource');
});
router.put('/doing_todone/:id/:task', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    const taskindex =   myProject.tasks_Doing.indexOf(req.params.task);
    if(taskindex != -1)
    {
        myProject.tasks_Done.push(myProject.tasks_Doing[taskindex]);
        myProject.tasks_Doing = myProject.tasks_Doing.filter((task)=>task !== req.params.task )
        myProject.save();
    }

    res.send('respond with a resource');
});
router.put('/done_todoing/:id/:task', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    const taskindex =   myProject.tasks_Done.indexOf(req.params.task);
    if(taskindex != -1)
    {
        myProject.tasks_Doing.push(myProject.tasks_Done[taskindex]);
        myProject.tasks_Done = myProject.tasks_Done.filter((task)=>task !== req.params.task )
        myProject.save();
    }

    res.send('respond with a resource');
});
router.put('/doing_todo/:id/:task', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    const taskindex =   myProject.tasks_Doing.indexOf(req.params.task);
    if(taskindex != -1)
    {
        myProject.tasks_ToDo.push(myProject.tasks_Doing[taskindex]);
        myProject.tasks_Doing = myProject.tasks_Doing.filter((task)=>task !== req.params.task )
        myProject.save();
    }

    res.send('respond with a resource');
});
router.put('/alltodo_doing/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    //const taskindex =   myProject.tasks_ToDo.indexOf(req.params.task);
    myProject.tasks_Doing= myProject.tasks_Doing.concat(myProject.tasks_ToDo);
    myProject.tasks_ToDo=[];

    myProject.save();

    res.send('respond with a resource');
});
router.put('/alldoing_done/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    //const taskindex =   myProject.tasks_ToDo.indexOf(req.params.task);
    myProject.tasks_Done= myProject.tasks_Done.concat(myProject.tasks_Doing);
    myProject.tasks_Doing=[];
    myProject.save();

    res.send('respond with a resource');
});
router.put('/alldone_doing/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    //const taskindex =   myProject.tasks_ToDo.indexOf(req.params.task);
    myProject.tasks_Doing= myProject.tasks_Doing.concat(myProject.tasks_Done);
    myProject.tasks_Done=[];
    myProject.save();

    res.send('respond with a resource');
});
router.put('/alldoing_todo/:id', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    //const taskindex =   myProject.tasks_ToDo.indexOf(req.params.task);
    myProject.tasks_ToDo= myProject.tasks_ToDo.concat(myProject.tasks_Doing);
    myProject.tasks_Doing=[];
    myProject.save();
    res.send('respond with a resource');
});
router.put('/addtasktodo/:id/:task', async function(req, res, next) {
    const myProject = await Project.findById(req.params.id)
    const newtask = req.params.task ; 
    myProject.tasks_ToDo.push(newtask);
    myProject.save();
    console.log(myProject);
    res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
    console.log(req.body)
    if(req.body.title && req.body.topic )
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
