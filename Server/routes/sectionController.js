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
        idProf: req.body.idProf,
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

// READ (list Sections for students)
router.get("/findSectionForStudents/:id/:idClass", async (req, res) => {
  try {
    let newLevel = await sections.aggregate([
      // $match: {
      //   idClasses: req.params.idClass,

      //       classUsers: {
      //         $in: [mongoose.Types.ObjectId(req.params.id)],
      //       },

      // },

      {
        $match: {
          classUsers: { $in: [mongoose.Types.ObjectId(req.params.id)] },
          idClasses: mongoose.Types.ObjectId(req.params.idClass),
        },
      },
    ]);

    res.json(newLevel);
  } catch (error) {
    res.status(404).json({ statue: false, message: error.message });
  }
});

// READ (ALL) By Class and Id Prof
router.get("/ProfAndClass/:id/:idProf", (req, res) => {
  sections
    .find({ idClasses: req.params.id, idProf: req.params.idProf })
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

// READ (ALL)
router.get("/", (req, res) => {
  sections
    .find({})
    .populate("idClasses")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Group.` });
    });
});

router.put("/updateSectionStudents/:id", (req, res) => {
  sections.findOne({ _id: req.params.id }).then((result) => {
    console.log("Req body !!!!!!");
    console.log(req.body);
    console.log(req.body.userOb);
    const studentsArray = result.classUsers;
    studentsArray.push(req.body.userOb);
    console.log("class users After update");
    console.log(studentsArray);
    sections
      .updateOne({ _id: req.params.id }, { classUsers: studentsArray })
      .then((resultat) => {
        res.json({
          success: true,
          msg: `It has been Updated.`,
          result: {
            _id: result._id,
            idProf: result.idProf,
            idGroup: result.idGroup,
            name: result.name,
            idClasses: result.idClasses,
            dateCreation: result.dateCreation,
            classUsers: studentsArray,
          },
        });
      })
      .catch((err) => {
        res
          .status(404)
          .json({ success: false, msg: "Something went wrong" + err });
      });
  });
});

// delete Student from list students

router.put("/deleteSectionStudent/:id", (req, res) => {
  sections.findOne({ _id: req.params.id }).then((result) => {
    console.log("Req body !!!!!!");
    console.log(req.body);
    console.log(req.body.userOb);
    const idUser = req.body.userOb;
    const studentsArray = result.classUsers;
    const index = studentsArray.indexOf(idUser);

    studentsArray.splice(index, 1);

    console.log("class users After update");
    console.log(studentsArray);
    sections
      .updateOne({ _id: req.params.id }, { classUsers: studentsArray })
      .then((resultat) => {
        res.json({
          success: true,
          msg: `It has been Updated.`,
          result: {
            _id: result._id,
            idProf: result.idProf,
            idGroup: result.idGroup,
            name: result.name,
            idClasses: result.idClasses,
            dateCreation: result.dateCreation,
            classUsers: studentsArray,
          },
        });
      })
      .catch((err) => {
        res
          .status(404)
          .json({ success: false, msg: "Something went wrong" + err });
      });
  });
});

module.exports = router;
