const express = require('express');
const router = express.Router();
const Meetopia = require("../models/meetopia")
const User = require("../models/user")

router.get('/GetMeetopiaDetails/:roomId', function(req, res, next) {
    if(req.params.roomId){
        Meetopia.findById(req.params.roomId).then( (foundMeetopia) => {
            res.send(foundMeetopia)
        }).catch( () => res.send('0') )
    } else res.send('0')
});

router.get('/GetMeetopiasByProf/:profId', function(req, res, next) {
    User.findById(req.params.profId).then( (foundProf) => {
        Meetopia.find( { professor: foundProf } ).populate('attendance', {firstname: 1, lastname: 1, email: 1 }).then( (data) => res.send(data) ).catch( () => res.send('0') );
    }).catch( () => res.send('0') )
});

router.post('/AddNewMeetopia', function(req, res, next) {
    if(req.body.title && req.body.profId){
        User.findById(req.body.profId).then( (foundProf) => {
            const newMeetopia = new Meetopia({ title: req.body.title, attendance: [], professor: foundProf })
            newMeetopia.save()
            res.send(newMeetopia._id);
        }).catch( () => res.send('0') )
    } else res.send('0')
});

router.put('/MarkPresence/:roomId/:studentid', function(req, res, next) {
    if(req.params.studentid && req.params.roomId ){
        User.findById(req.params.studentid).then( (foundStudent) => {
            if(foundStudent.role === 'student') 
            Meetopia.findById(req.params.roomId).then( (foundMeetopia) => {
                const foundPresence = foundMeetopia.attendance.filter( studentid => studentid == req.params.studentid )[0]
                if(!foundPresence){
                    foundMeetopia.attendance.push(foundStudent)
                    foundMeetopia.save()
                }
                res.send('1')
            }).catch( () => res.send('0') )
        }).catch( () => res.send('0') )
    } else res.send('0')
});

router.put('/ChangeTitle', (req, res) => { 
    if(req.body.profId && req.body.roomId && req.body.title ){
        Meetopia.findById(req.body.roomId).then( (foundMeetopia) => { 
                User.findById(foundMeetopia.professor).then( (foundProfessor) => {
                if( foundMeetopia.professor == req.body.profId ){
                    foundMeetopia.title = req.body.title
                    foundMeetopia.save()
                }
                res.send('1')
            }).catch( () => res.send('0') )
        }).catch( () => res.send('0') )
    } else res.send('0')
})

router.delete('/:profId/:roomId', function(req, res, next) {
    if( req.params.roomId && req.params.profId ){
        User.findById(req.params.profId).then( (foundProf) => {
            Meetopia.find( { professor: foundProf, _id: req.params.roomId } ).then( (data) => { 
                if (data.length === 1) { data[0].delete();  res.send('1'); } } ).catch( (err) => res.send('0') );
        }).catch( () => res.send('0') )
    }else res.send('0')
});

module.exports = router;
