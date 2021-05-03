const cors = require("cors");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var Bcrypte = require("bcrypt-nodejs");
const { google } = require("googleapis");
var requestt = require("request");
const { OAuth2 } = google.auth;

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var async = require("async");
var crypto = require("crypto");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user");
const client = new OAuth2(process.env.googleClientID);
// @route POST api/users/register
// @desc Register user
// @access Public
router.use(cors());
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials : true")
//   res.header("Access-Control-Allow-Methods : GET, POST, OPTIONS")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
let multer = require("multer");
const { request } = require("express");

const DIR = "./public/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post("/user-profile", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.body);
  const img = req.body.image;

  User.findOne({ _id: req.body._id }, function (err, user) {
    if (!user) {
      res.status(401).json("email n'existe pas");
    }
    console.log("x");
    console.log(img);
    user.image = img;

    user
      .save()
      .then(res.status(200).json(user), console.log(user))
      .catch((err) => console.log(err));
  });
});
router.post("/findimage/:email", (req, res) => {
  var x = true;

  User.findOne({ email: req.params.email }, (err, c) => {
    if (c) res.json(c.image);
    else res.status(401).json(" Introuvable");
  });
});

// UPLOAD

router.post("/upload", upload.single("image"), (req, res, next) => {
  const reqFiles = "";
  const url = process.env.BACKEND_PROTOCOL + "://" + req.get("host");
  if (req.files) {
    reqFiles =
      process.env.BACKEND_PROTOCOL +
      process.env.BACKEND_IP +
      ":" +
      process.env.PORT +
      "/uploads/" +
      req.files.filename;
  }

  res.status(201).json({
    msg: "Done upload!",
    success: true,
    result: {
      reqFiles,
    },
  });
});
router.post("/register_professor", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: "professor",
        etat: false,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                firsname: user.firstname,
              };
              jwt.sign(
                payload,
                process.env.secretOrKey,
                {
                  expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
router.post("/register_admin", (req, res) => {
  console.log(req.body);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: "admin",
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                firsname: user.firstname,
              };
              jwt.sign(
                payload,
                process.env.secretOrKey,
                {
                  expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                firsname: user.firstname,
              };
              jwt.sign(
                payload,
                process.env.secretOrKey,
                {
                  expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        if (user.etat == !true && user.role == "professor") {
          return res
            .status(402)
            .json({ professorNA: "Not Approved Professor" });
        }
        if (user.etat == !true && user.role == "student") {
          return res
            .status(403)
            .json({ StudentNa: "Your account is suspended" });
        }
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firsname: user.firstname,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
<<<<<<< Updated upstream
  router.get("/allstudent",  (req, res) => {
    User.find({role:"student"}, (err, u) => {
        res.json(u)    })

})
router.get("/alladmin",  (req, res) => {
  User.find({role:"admin"}, (err, u) => {
      res.json(u)    })

})
router.get("/allprofessor",  (req, res) => {
  User.find({$and:[{role:"professor"},{ etat:{$ne: true} }]}
  , (err, u) => {
      res.json(u)    })

})
router.delete('/:id', async function(req, res, next) {
  console.log(req.params.id)
=======
});
router.get("/allstudent", (req, res) => {
  User.find({ role: "student" }, (err, u) => {
    res.json(u);
  });
});
router.get("/alladmin", (req, res) => {
  User.find({ role: "admin" }, (err, u) => {
    res.json(u);
  });
});
router.get("/allprofessor", (req, res) => {
  User.find(
    { $and: [{ role: "professor" }, { etat: { $ne: true } }] },
    (err, u) => {
      res.json(u);
    }
  );
});
router.get("/allprofessors", (req, res) => {
  User.find({ $and: [{ role: "professor" }, { etat: true }] }, (err, u) => {
    res.json(u);
  });
});
router.delete("/:id", async function (req, res, next) {
  console.log(req.params.id);
>>>>>>> Stashed changes
  res.send(await Group.findByIdAndDelete(req.params.id));
});
router.get("/nbStudent", (req, res) => {
  User.find({ role: "student" }, (err, u) => {
    res.json(u.length);
  });
});
router.get("/nbprofessor", (req, res) => {
  User.find({ role: "professor" }, (err, u) => {
    res.json(u.length);
  });
});
router.get("/:id", (req, res) => {
  var x = true;

  User.findById({ _id: req.params.id }, (err, c) => {
    console.log(c);

    res.json(c);
  });
});
router.post("/forgot", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            res.status(401).json("email n'existe pas");
          } else {
            user.resetPasswordToken = token;

            user.save(function (err) {
              done(err, token, user);
            });
          }
        });
      },
      function (token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "meetopiaa@gmail.com",
            pass: "Meetopiaa1.",
          },
        });
        console.log("before render");
        res.render(
          "mail/passwordReset",
          {
            name: user.firstname,
            lastname: user.lastname,
            resetLink: "http://localhost:466/auth/reset",
            mailtoName: "Edutopia",
            mailtoAddress: "meetopiaa@gmail.com",
            token: token,
          },
          function (err, html) {
            if (err) {
              console.log(err);
              return err, null;
            } else {
              // Now create email text (multiline string as array FTW)
              var text = [
                "Hello " + user.firstname + "!",
                "Here is a special link that will allow you to reset your password.",
                "http://localhost:466/auth/reset and paste this code in the token placeholder that is in your browser to complete the process:\n\n",
                +token +
                  "\n\n" +
                  "Thanks so much for using our services! If you have any questions, or suggestions, feel free to email us here at " +
                  ".",
                "  - The Udetopia team",
              ].join("\n\n");

              // Create email
              var mailOptions = {
                to: user.email,
                from: "meetopiaa@gmail.com",
                subject: "Reset your  password",
                text: text,
                html: html,
              };

              smtpTransport.sendMail(mailOptions, function (err) {
                res
                  .status(200)
                  .json(
                    "An e-mail has been sent to " +
                      user.email +
                      "with further instructions."
                  );
                console.log("mail sent");
              });
            }
          }
        );
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
});
router.post("/reset", (req, res) => {
  console.log("eee" + req.body.token);

  User.findOne({ resetPasswordToken: req.body.token }, (err, user) => {
    if (!user) {
      res.status(401).json("email n'existe pas");
    }
    user.password = Bcrypte.hashSync(
      req.body.password,
      Bcrypte.genSaltSync(10)
    );
    console.log("reset tttttttt " + user);
    user.save();
    res.status(200).json("c bon");
  });
});
router.post("/changePWD", (req, res) => {
  console.log(req.body);

  const password = req.body.password;
  const newpassword = req.body.newpassword;
  User.findOne({ _id: req.body._id }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Change psw
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newpassword, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(res.status(200).json("c bon"))
              .catch((err) => console.log(err));
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
router.post("/send", (req, res, next) => {
  console.log(req.body);
  var name = req.body.data.name;
  var email = req.body.data.email;
  var subject = req.body.data.subject;
  var message = req.body.data.message;
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "meetopiaa@gmail.com",
      pass: "Meetopiaa1.",
    },
  });
  var mail = {
    from: email,
    to: "meetopiaa@gmail.com",
    subject: subject,
    text: `${name} <${email}> \n${message}`,
  };

  smtpTransport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});
router.post("/ban", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, u) {
    async.waterfall([
      function () {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "meetopiaa@gmail.com",
            pass: "Meetopiaa1.",
          },
        });
        res.render(
          "mail/ban",
          {
            name: u.firstname,
            lastname: u.lastname,

            mailtoName: "Edutopia",
            mailtoAddress: "meetopiaa@gmail.com",
          },
          function (err, html) {
            if (err) {
              console.log(err);
              return err, null;
            } else {
              // Now create email text (multiline string as array FTW)
              var text = [
                "Hello " + u.firstname + "!",
                "Here is a special link that will allow you to reset your password.",
                "http://localhost:466/auth/reset and paste this code in the token placeholder that is in your browser to complete the process:\n\n",

                "\n\n" +
                  "Thanks so much for using our services! If you have any questions, or suggestions, feel free to email us here at " +
                  ".",
                "  - The Udetopia team",
              ].join("\n\n");

              // Create email
              var mailOptions = {
                to: u.email,
                from: "meetopiaa@gmail.com",
                subject: "Your Edutopia Account",
                text: text,
                html: html,
              };

              smtpTransport.sendMail(mailOptions, function (err) {
                res
                  .status(200)
                  .json(
                    "An e-mail has been sent to " +
                      u.email +
                      "with further instructions."
                  );
                console.log("mail sent");
              });
            }
          }
        );
      },
    ]);
    u.etat = false;
    u.save();

    res.status(200).json("vous pouvez maintenant connecter");
  });
});
router.post("/accepter", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, u) {
    async.waterfall([
      function () {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "meetopiaa@gmail.com",
            pass: "Meetopiaa1.",
          },
        });
        res.render(
          "mail/accept",
          {
            name: u.firstname,
            lastname: u.lastname,

            mailtoName: "Edutopia",
            mailtoAddress: "meetopiaa@gmail.com",
          },
          function (err, html) {
            if (err) {
              console.log(err);
              return err, null;
            } else {
              // Now create email text (multiline string as array FTW)
              var text = [
                "Hello " + u.firstname + "!",
                "Here is a special link that will allow you to reset your password.",
                "http://localhost:466/auth/reset and paste this code in the token placeholder that is in your browser to complete the process:\n\n",

                "\n\n" +
                  "Thanks so much for using our services! If you have any questions, or suggestions, feel free to email us here at " +
                  ".",
                "  - The Udetopia team",
              ].join("\n\n");

              // Create email
              var mailOptions = {
                to: u.email,
                from: "meetopiaa@gmail.com",
                subject: "Welcome to Edutopia",
                text: text,
                html: html,
              };

              smtpTransport.sendMail(mailOptions, function (err) {
                res
                  .status(200)
                  .json(
                    "An e-mail has been sent to " +
                      u.email +
                      "with further instructions."
                  );
                console.log("mail sent");
              });
            }
          }
        );
      },
    ]);
    u.etat = true;
    u.save();

    res.status(200).json("vous pouvez maintenant connecter");
  });
});
router.post("/inban", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, u) {
    async.waterfall([
      function () {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "meetopiaa@gmail.com",
            pass: "Meetopiaa1.",
          },
        });
        res.render(
          "mail/inban",
          {
            name: u.firstname,
            lastname: u.lastname,

            mailtoName: "Edutopia",
            mailtoAddress: "meetopiaa@gmail.com",
          },
          function (err, html) {
            if (err) {
              console.log(err);
              return err, null;
            } else {
              // Now create email text (multiline string as array FTW)
              var text = [
                "Hello " + u.firstname + "!",
                "Here is a special link that will allow you to reset your password.",
                "http://localhost:466/auth/reset and paste this code in the token placeholder that is in your browser to complete the process:\n\n",

                "\n\n" +
                  "Thanks so much for using our services! If you have any questions, or suggestions, feel free to email us here at " +
                  ".",
                "  - The Udetopia team",
              ].join("\n\n");

              // Create email
              var mailOptions = {
                to: u.email,
                from: "meetopiaa@gmail.com",
                subject: "Your Edutopia Account",
                text: text,
                html: html,
              };

              smtpTransport.sendMail(mailOptions, function (err) {
                res
                  .status(200)
                  .json(
                    "An e-mail has been sent to " +
                      u.email +
                      "with further instructions."
                  );
                console.log("mail sent");
              });
            }
          }
        );
      },
    ]);
    u.etat = true;
    u.save();

    res.status(200).json("vous pouvez maintenant connecter");
  });
});
router.post("/deleteuser", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, u) {
    async.waterfall([
      function () {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "meetopiaa@gmail.com",
            pass: "Meetopiaa1.",
          },
        });
        res.render(
          "mail/delete",
          {
            name: u.firstname,
            lastname: u.lastname,

            mailtoName: "Edutopia",
            mailtoAddress: "meetopiaa@gmail.com",
          },
          function (err, html) {
            if (err) {
              console.log(err);
              return err, null;
            } else {
              // Now create email text (multiline string as array FTW)
              var text = [
                "Hello " + u.firstname + "!",
                "Here is a special link that will allow you to reset your password.",
                "http://localhost:466/auth/reset and paste this code in the token placeholder that is in your browser to complete the process:\n\n",

                "\n\n" +
                  "Thanks so much for using our services! If you have any questions, or suggestions, feel free to email us here at " +
                  ".",
                "  - The Udetopia team",
              ].join("\n\n");

              // Create email
              var mailOptions = {
                to: u.email,
                from: "meetopiaa@gmail.com",
                subject: "Your Edutopia Account",
                text: text,
                html: html,
              };

              smtpTransport.sendMail(mailOptions, function (err) {
                res
                  .status(200)
                  .json(
                    "An e-mail has been sent to " +
                      u.email +
                      "with further instructions."
                  );
                console.log("mail sent");
              });
            }
          }
        );
      },
    ]);
    u.remove(u);

    res.status(200).json("votre demande refuser");
  });
});
router.post("/refuser", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, u) {
    async.waterfall([
      function () {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "meetopiaa@gmail.com",
            pass: "Meetopiaa1.",
          },
        });
        res.render(
          "mail/refuse",
          {
            name: u.firstname,
            lastname: u.lastname,

            mailtoName: "Edutopia",
            mailtoAddress: "meetopiaa@gmail.com",
          },
          function (err, html) {
            if (err) {
              console.log(err);
              return err, null;
            } else {
              // Now create email text (multiline string as array FTW)
              var text = [
                "Hello " + u.firstname + "!",
                "Here is a special link that will allow you to reset your password.",
                "http://localhost:466/auth/reset and paste this code in the token placeholder that is in your browser to complete the process:\n\n",

                "\n\n" +
                  "Thanks so much for using our services! If you have any questions, or suggestions, feel free to email us here at " +
                  ".",
                "  - The Udetopia team",
              ].join("\n\n");

              // Create email
              var mailOptions = {
                to: u.email,
                from: "meetopiaa@gmail.com",
                subject: "Your application to Edutopia",
                text: text,
                html: html,
              };

              smtpTransport.sendMail(mailOptions, function (err) {
                res
                  .status(200)
                  .json(
                    "An e-mail has been sent to " +
                      u.email +
                      "with further instructions."
                  );
                console.log("mail sent");
              });
            }
          }
        );
      },
    ]);
    u.remove(u);

    res.status(200).json("votre demande refuser");
  });
});
function callMeAPI(accessToken, done) {
  console.log(accessToken);
  requestt.get(
    {
      url:
        "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
      headers: { Authorization: "Bearer " + accessToken },
    },
    function (err, res, responseBody) {
      if (err) {
        console.log(err);
        done(err, null);
      } else {
        console.log(done);
        done(null, JSON.parse(responseBody));
      }
    }
  );
}
function callEmailAPI(accessToken, done) {
  requestt.get(
    {
      url:
        "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      headers: { Authorization: "Bearer " + accessToken },
    },
    function (err, res, responseBody) {
      if (err) {
        console.log(err);
        done(err, null);
      } else {
        console.log(responseBody);
        done(null, JSON.parse(responseBody));
      }
    }
  );
}
router.post("/linkedin_login", async (req, response) => {
  try {
    const { tokenId } = req.body;
    console.log({ tokenId });
    requestt.post(
      {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
        form: {
          grant_type: "authorization_code",
          code: tokenId,
          redirect_uri: "http://localhost:466/auth/linkedin",
          client_id: process.env.linkedinClientID,
          client_secret: process.env.linkedinClientSecret,
        },
      },
      function (err, res, responseBody) {
        if (err) {
          console.log(err);
        } else {
          const res = JSON.parse(responseBody);
          console.log(res);
          const access_token = res.access_token;
          console.log(access_token);
          callMeAPI(access_token, function (err, ress) {
            if (err) {
              done(err);
            } else {
              var firstname = ress.localizedFirstName;
              var lastname = ress.localizedLastName;
              var picture =
                ress.profilePicture["displayImage~"].elements[0].identifiers[0]
                  .identifier;
              console.log(ress);
              console.log(
                ress.profilePicture["displayImage~"].elements[0].identifiers[0]
                  .identifier
              );
              callEmailAPI(access_token, async function (err, res) {
                if (err) {
                  done(err);
                } else {
                  var email = res.elements[0]["handle~"].emailAddress;
                  console.log(firstname + lastname + picture + email);
                  const password = email + process.env.google_secret;

                  const passwordHash = await bcrypt.hash(password, 12);

                  if (!email)
                    return response
                      .status(400)
                      .json({ msg: "Email verification failed." });

                  const user = await User.findOne({ email: email });
                  console.log("ddddd" + user);
                  if (user) {
                    const isMatch = await bcrypt.compare(
                      password,
                      user.password
                    );
                    console.log("ddd" + isMatch);
                    if (!isMatch)
                      return response
                        .status(400)
                        .json({ msg: "Password is incorrect." });
                        if (user.etat == !true && user.role == "student") {
                          return response
                            .status(403)
                            .json({ StudentNa: "Your account is suspended" });
                        }
                    const payload = {
                      id: user.id,
                      firsname: user.firstname,
                    };
                    jwt.sign(
                      payload,
                      process.env.secretOrKey,
                      {
                        expiresIn: 31556926, // 1 year in seconds
                      },
                      (err, token) => {
                        response.json({
                          success: true,
                          token: "Bearer " + token,
                        });
                      }
                    );
                  } else {
                    const newUser = new User({
                      firstname: firstname,
                      lastname: lastname,
                      email: email,
                      password: passwordHash,
                      image: picture,
                    });
                    console.log("ffff");
                    console.log(newUser);

                    await newUser
                      .save()
                      .then((user) => {
                        const payload = {
                          id: user.id,
                          firsname: user.firstname,
                        };
                        jwt.sign(
                          payload,
                          process.env.secretOrKey,
                          {
                            expiresIn: 31556926, // 1 year in seconds
                          },
                          (err, token) => {
                            response.json({
                              success: true,
                              token: "Bearer " + token,
                            });
                          }
                        );
                      })
                      .catch((err) => console.log(err));
                  }
                }
              });
            }
          });
        }
      }
    );
  } catch (err) {
    return response.status(500).json({ msg: err.message });
  }
});

router.post("/google_login", async (req, res) => {
  try {
    const { tokenId } = req.body;
    console.log({ tokenId });
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.googleClientID,
    });
    console.log(verify);
    const {
      email_verified,
      email,
      given_name,
      family_name,
      picture,
    } = verify.payload;
    console.log({ email_verified, email, given_name, family_name });

    const password = email + process.env.google_secret;

    const passwordHash = await bcrypt.hash(password, 12);

    if (!email_verified)
      return res.status(400).json({ msg: "Email verification failed." });

    const user = await User.findOne({ email: email });
    console.log("ddddd" + user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("ddd" + isMatch);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });
        if (user.etat == !true && user.role == "student") {
          return res
            .status(403)
            .json({ StudentNa: "Your account is suspended" });
        }
      const payload = {
        id: user.id,
        firsname: user.firstname,
      };
      jwt.sign(
        payload,
        process.env.secretOrKey,
        {
          expiresIn: 31556926, // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      const newUser = new User({
        firstname: given_name,
        lastname: family_name,
        email,
        password: passwordHash,
        image: picture,
      });
      console.log("ffff");
      console.log(newUser);

      await newUser
        .save()
        .then((user) => {
          const payload = {
            id: user.id,
            firsname: user.firstname,
          };
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
