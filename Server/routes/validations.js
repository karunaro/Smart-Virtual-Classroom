var express = require('express');
var router = express.Router();
const Validation = require('../models/validations')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await Validation.find());
});
router.post('/', function(req, res, next) {
    console.log(req.body)
    if( req.body.topic && req.body.session && req.body.asked_work )
        {
            const newvalidation = new Validation(req.body)
            console.log(newvalidation)
            newvalidation.save()
        }
    res.send('respond with a resource');
});
router.delete('/:id', async function(req, res, next) {
    res.send(await Validation.findByIdAndDelete(req.params.id));
});
module.exports = router;
