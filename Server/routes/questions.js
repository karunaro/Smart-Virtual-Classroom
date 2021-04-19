var express = require('express');
var router = express.Router();
const Question = require('../models/questions')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await Question.find());
});

router.get('/:id', async function(req, res, next) {
    const myQuestion = await Question.findById(req.params.id)
    if(myQuestion)
        res.send(myQuestion);       
    else
        res.send('0');
  });

  router.post('/hihi', function(req, res, next) {
    console.log('hihi')
    res.send('hihi');
});
router.put('/addanswer/:idquestion', async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.idquestion)
    
            const newQuestion = await Question.findById(req.params.idquestion)
            newQuestion.answer = req.body.answer
            
            console.log(newQuestion)
            newQuestion.save()
        
    res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
    console.log(req.body)
    const student =  new User ({_id: req.body.student})
    console.log(student)
    const {topic: topic , question : question} = req.body
    if(req.body.topic  && req.body.question)
        {
            const newQuestion = new Question({topic , question , student})
            console.log(newQuestion)
            newQuestion.save()
        }
    res.send('respond with a resource');
});

router.delete('/:id', async function(req, res, next) {
    console.log(req.params.id)
    res.send(await Question.findByIdAndDelete(req.params.id));
});

router.put('/:id', function(req, res, next) {
    if(req.body.topic && req.body.answer && req.body.student)
        {
            Question.findByIdAndUpdate(req.params.id,req.body).exec()
        }
    res.send('modified');
});

module.exports = router;
