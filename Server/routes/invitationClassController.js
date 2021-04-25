const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let invitations = require("../models/invitationsClass");

// ADD INVITATION
router.post("/", (req, res) => {
  console.log(req.body);
  let invitation = new invitations({
    status: req.body.status,
    classOb: req.body.classOb,
    userOb: req.body.userOb,
  });
  invitation
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          status: result.status,
          classOb: result.classOb,
          userOb: result.userOb,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.status) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.status.message });
          return;
        }
        if (err.errors.classOb) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.classOb.message });
          return;
        }
        if (err.errors.userOb) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.userOb.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE INVITATION

router.put("/", (req, res) => {
  const userId = req.body.userOb;
  const classId = req.body.classOb;
  invitations
    .findOne({ classOb: classId, userOb: userId })
    .then(() => {
      invitations
        .updateOne({ classOb: classId, userOb: userId }, { status: "accepted" })
        .then((result) => {
          console.log("accepted");
          res.json({
            success: true,
            msg: `Invitation has been accepted !`,
          });
        })
        .catch((err) => {
          res.json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      res.json({ success: false, msg: `Something went wrong. ${err}` });
      return;
    });
});

// DELETE INVITATIONS

router.delete("/:idClass/:idUser", (req, res) => {
  console.log("this is params !!!");
  console.log(req.params);

  invitations
    .findOneAndRemove({
      classOb: req.params.idClass,
      userOb: req.params.idUser,
    })
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          userOb: result.userOb,
          classOb: result.classOb,
          status: result.status,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

// FIND LIST CLASS MEMBERS

router.get("/listAcceptedByClass/:id", (req, res) => {
  const users = [];
  invitations
    .find({ classOb: req.params.id, status: "accepted" })
    .populate("userOb")
    .then((result) => {
      if (result.length !== 0) {
        for (let i = 0; i < result.length; i++) {
          users.push(result[i].userOb);
        }
      }

      res.json(users);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to display." });
    });
});

// FIND LIST loading

router.get("/listInaccepted/:id", (req, res) => {
  invitations
    .find({ userOb: req.params.id, status: "loading" })
    .populate("classOb")
    .populate("userOb")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to display." });
    });
});

// FIND LIST Accepted

router.get("/listAcceptedByUser/:id", (req, res) => {
  invitations
    .find({ userOb: req.params.id, status: "accepted" })
    .populate("classOb")
    .populate("userOb")
    .then((result) => {
      const classes = [];
      for (let i = 0; i < result.length; i++) {
        classes.push(result[i].classOb);
      }
      res.json(classes);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to display." });
    });
});

module.exports = router;
