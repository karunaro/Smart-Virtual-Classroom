var express = require('express');
var router = express.Router();
const Group = require('../models/group')
const User = require('../models/user')
const Question = require('../models/questions') 
const Validation = require('../models/validations') 
const Project = require('../models/project') 
/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await Group.find());
});
router.get('/:id', async function(req, res, next) {
    const mygroup = await Group.findById(req.params.id).populate('members')
    if(mygroup)
        res.send(mygroup);
    else
        res.send('0');
  });
  router.get('/questions/:id', async function(req, res, next) {
    const mygroup = await Group.findById(req.params.id).populate('questions')
    if(mygroup)
        res.send(mygroup);
    else
        res.send('0');
  });
  router.get('/validations/:id', async function(req, res, next) {
    const mygroup = await Group.findById(req.params.id).populate('validations')
    if(mygroup)
        res.send(mygroup);
    else
        res.send('0');
  });
  router.get('/projects/:id', async function(req, res, next) {
    const mygroup = await Group.findById(req.params.id).populate('projects')
    if(mygroup)
        res.send(mygroup);
    else
        res.send('0');
  });
router.put('/deletememberfromgroup/:idgroup/:idmember', async  function(req, res, next) {
   console.log(req.params.idgroup, req.params.idmember)
  const group = await Group.findById(req.params.idgroup).populate('members')
//console.log(group.members)
 const newmembers = await group.members.filter(member => member._id != req.params.idmember)

console.log(group)
group.members = newmembers
console.log(group)
await Group.findByIdAndUpdate(req.params.idgroup , group)
res.send("haha");

 });
router.get('/:id', async function(req, res, next) {
    const myGroup = await Group.findById(req.params.id)
    if(myGroup)
        res.send(myGroup);       
    else
        res.send('0');
  });
    router.post('/addquestion/:idgroup/:idquestion', async function(req, res, next) {
   
    const group = await Group.findById(req.params.idgroup)
    console.log(group)
    const newquestion =  new Question ({_id: req.params.idquestion})
    group.questions.push(newquestion)
    console.log(group)
    group.save()
  
    res.send('respond with a resource');
});
router.post('/addvalidation/:idgroup/:idvalidation', async function(req, res, next) {
   
    const group = await Group.findById(req.params.idgroup)
    console.log(group)
    const newvalidation =  new Validation ({_id: req.params.idvalidation})
    group.validations.push(newvalidation)
    console.log(group)
    group.save()
  
    res.send('respond with a resource');
});

router.post('/addproject/:idgroup/:idproject', async function(req, res, next) {
   
    const group = await Group.findById(req.params.idgroup)
    console.log(group)
    const newproject =  new Project ({_id: req.params.idproject})
    group.projects.push(newproject)
    console.log(group)
    group.save()
  
    res.send('respond with a resource');
});
  router.post('/addmember/:idgroup/:idmember', async function(req, res, next) {
   
    const group = await Group.findById(req.params.idgroup)
    console.log(group)
    const newmember =  new User ({_id: req.params.idmember})
    group.members.push(newmember)
    console.log(group)
    group.save()
    //Group.findByIdAndUpdate(req.params.idgroup, group)
  /* if(req.body.id )
        {
            const newmembers = await group.members.filter(member => member._id === req.params.idmember)
          
            group.members = newmembers
            console.log(newGroup)
            newGroup.save()
        }*/
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    if(req.body.name && req.body.description )
        {
            const newGroup = new Group(req.body)
            console.log(newGroup)
            newGroup.save()
        }
    res.send('respond with a resource');
});

router.delete('/:id', async function(req, res, next) {
    console.log(req.params.id)
    res.send(await Group.findByIdAndDelete(req.params.id));
});

router.put('/:id', function(req, res, next) {
    if(req.body.name && req.body.description && req.body.members  && req.body.questions && req.body.validations && req.body.projects )
        {
            console.log("3abida")
            Group.findByIdAndUpdate(req.params.id,req.body).exec()
        }
    res.send('modified');
});

module.exports = router;
