var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Courses = require('../models/courses')
const Quizz = require('../models/quizz')

router.get('/MyQuizzesProf/:professorId', function(req, res, next) {
    if( req.params.professorId )
    {
        Quizz.find( {professor: req.params.professorId} ).then( (data) => {
            res.send(data)
        }).catch( () => res.send('0') )
    }else res.send('0')
});

router.get('/MyQuizzesStudent/:studentId', function(req, res, next) {
    if( req.params.studentId )
    {
        Quizz.find( { students : req.params.studentId  } ).then( (foundQuizzes) => {
            res.send( foundQuizzes )
        }).catch( () => res.send('0') )
    } else res.send('0')
});

router.get('/:quizzId', function (req, res) {
    if( req.params.quizzId )
    {
        Quizz.findById(req.params.quizzId).then( (foundQuizzes) => {
            res.send( foundQuizzes )
        }).catch( () => res.send('0') )
    } else res.send('0')
})

router.post('/AddNewQuizz', function(req, res, next) {
    if(req.body.title && req.body.profId && req.body.questions ){
        User.findById(req.body.profId).then( (foundProfessor) => {
            if(foundProfessor.role === 'professor')
             {
                const newQuizz = new Quizz( { title: req.body.title, professor: req.body.profId, questions: req.body.questions, students: req.body.students, course: req.body.course } )
                newQuizz.save()
                res.send('1');
             }
        }).catch( () => res.send('0') )  
    } else res.send('0')
});

router.put('/PassQuizz', function(req, res, next) {
    let grade = 0
    User.findById(req.body.userId).then( (foundUser) => {
        Quizz.findById(req.body.quizzId).then( (foundQuizz) => {
            if( foundQuizz.students.filter( (student) => student == req.body.userId)[0] )
                {
                    foundQuizz.questions.forEach( (question, index) => { if(question.correctAnswer == req.body.answers[index] ) grade++ } )
                    const foundGrade = foundQuizz.grades.filter( grade => grade.userId == req.body.userId )[0]
                    if(!foundGrade)
                    {
                        foundQuizz.grades.push( { grade, student: req.body.userId } )
                        foundQuizz.save()
                        res.send('1')
                    }
                }else res.send('0')
        })
        .catch( () => res.send('0') )
    })
    .catch( () => res.send('0') )
});

router.delete('/DeleteQuizz/:profId/:quizzId', function(req, res, next) {
    if( req.params.profId && req.params.quizzId )
        {
            User.findById(req.params.profId).then( (foundProfessor) => {
                if(foundProfessor.role === 'professor')
                {
                    Quizz.findById(req.params.quizzId).then( (foundRoom) => {
                        if( foundRoom.professor == req.params.profId )
                            {
                                foundRoom.delete()
                                res.send('1')
                            }else res.send('0')
                    }).catch( () => res.send('0') )
                }else res.send('0')
            }).catch( () => res.send('0') )
        } else res.send('0')
});

module.exports = router;
