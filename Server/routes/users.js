const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user");
// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register_professor", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          role:  "professor"  
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
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
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          fistname: req.body.fistname,
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
              .then(user => res.json(user))
              .catch(err => console.log(err));
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
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            firsname: user.firstname
          };
  // Sign token
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
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
  });
// // Register
// router.post("/register", async (req, res) => {
// try {
// let { email, password, passwordCheck, firstname, lastname , } = req.body;
// // validate
// if (!email || !password || !passwordCheck || !firstname || !lastname)
// return res.status(400).json({ msg: "Not all fields have been entered." });
// if (password.length < 5)
// return res
// .status(400)
// .json({ msg: "The password needs to be at least 5 characters long." });
// if (password !== passwordCheck)
// return res
// .status(400)
// .json({ msg: "Enter the same password twice for verification." });
// const existingUser = await User.findOne({ email: email });
// if (existingUser)
// return res
// .status(400)
// .json({ msg: "An account with this email already exists." });
// //if (!displayName) displayName = email;
// const salt = await bcrypt.genSalt();
// const passwordHash = await bcrypt.hash(password, salt);
// const role = 'student'
// const newUser = new User({
// email,
// password: passwordHash,
// firstname,
// lastname,
// role,
// });
// const savedUser = await newUser.save();
// res.json(savedUser);
// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });
// // Login
// router.post("/login", async (req, res) => {
// try {
// const { email, password } = req.body;
// // validate
// if (!email || !password)
// return res.status(400).json({ msg: "Not all fields have been entered." });
// const user = await User.findOne({ email: email });
// if (!user)
// return res
// .status(400)
// .json({ msg: "No account with this email has been registered." });
// const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
// res.json({
// token,
// user: {
// id: user._id,
// firstname: user.firstname,
// lastname: user.lastname,
// role: user.role
// },
// });
// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });
// // Delete
// router.delete("/delete", auth, async (req, res) => {
// try {
// const deletedUser = await User.findByIdAndDelete(req.user);
// res.json(deletedUser);
// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });
// // Check if token is valid
// router.post("/tokenIsValid", async (req, res) => {
// try {
// const token = req.header("x-auth-token");
// if (!token) return res.json(false);
// const verified = jwt.verify(token, process.env.JWT_SECRET);
// if (!verified) return res.json(false);
// const user = await User.findById(verified.id);
// if (!user) return res.json(false);
// return res.json(true);
// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });
// router.get("/", auth, async (req, res) => {
// const user = await User.findById(req.user);
// res.json({
// firstname: user.firstname,
// lastname: user.lastname,
// role: user.role,
// id: user._id,
// });
// });
 module.exports = router;