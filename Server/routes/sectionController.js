const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let sections = require("../models/section");

// ADD SECTION
router.post("/", (req, res) => {
  console.log(req.body);
  let section = new sections({
    idProf: req.body.idProf,
    idGroup: req.body.idGroup,
    name: req.body.name,
    dateCreation: Date.now(),
    classUsers: req.body.classUsers,
    idClasses: req.body.idClasses,
  });
  section
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idProf: result.idProf,
          idGroup: result.idGroup,
          name: result.name,
          dateCreation: result.dateCreation,
          classUsers: result.classUsers,
          idClasses: result.idClasses,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.classUsers) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.classUsers.message });
          return;
        }
        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }
        if (err.errors.name) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.name.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE SECTION

router.put("/:id", (req, res) => {
  let updatedSection = {
    name: req.body.name,
    dateCreation: Date.now(),
    idClasses: req.body.idClasses,
  };

  sections
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        dateCreation: Date.now(),
        idClasses: req.body.idClasses,
      },
      {
        runValidators: true,
        context: "query",
      }
    )
    .then((oldResult) => {
      sections
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              idProf: newResult.idProf,
              name: newResult.name,
              dateCreation: newResult.dateCreation,
              idGroup: newResult.idGroup,
              classUsers: newResult.classUsers,
              idClasses: newResult.idClasses,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.name.message });
          return;
        }

        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  sections
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idProf: result.idProf,
          name: result.name,
          dateCreation: result.dateCreation,
          idGroup: result.idGroup,
          classUsers: result.classUsers,
          idClasses: result.idClasses,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

// READ (ALL) By Class
router.get("/class/:id", (req, res) => {
  sections
    .find({ idClasses: req.params.id })
    .populate("idClasses")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get("/:id", (req, res) => {
  sections
    .findById(req.params.id)
    .populate("idClasses")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Group.` });
    });
});

module.exports = router;
