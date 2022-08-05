const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");

router.post("/signup", (req, res, next) => {
  // Verify that first name is not empty
  if (!req.body.firstName) {
    res.statusCode = 500;
    res.send({
      name: "FirstNameError",
      message: "The first name is required",
    });
  } else {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName || "";
          user.journalEntries = req.body.journalEntries || [];
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});

router.get('/delete', verifyUser, (req, res, next) => {
  User.findByIdAndRemove(req.user._id).then(
    (user) => {
      res.send({ success: true });
    },
    (err) => next(err)
  );
});

router.post('/saveJournalEntry', verifyUser, (req, res, next) => {
  User.findById(req.user._id).then(
    (user) => {
      user.journalEntries.push(req.body);
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.send(user);
        }
      });
    },
    (err) => next(err)
  );
});

router.post('/deleteJournalEntry', verifyUser, (req, res, next) => {
  User.findById(req.user._id).then(
    (user) => {
      user.journalEntries.remove(req.body,{single:true},function(err){});;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.send(user);
        }
      });
    },
    (err) => next(err)
  );
});

router.post('/updatePassword', (req, res, next) => { 
  User.findByUsername(req.body.username).then(
    (user) => {
      user.setPassword(req.body.password, function(err){
        if(err){
          res.statusCode = 500;
          res.send(err);
        }
        else{
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.send(user);
            }
          });
        }
      });
    }
  );
})

router.post('/emailUser', (req, res) => {

  async function mail(email, resetToken){
      
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "a2plcpnl0929.prod.iad2.secureserver.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "donotreply@joonipea.com", // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: {servername: "joonipea.com"},
      sendMail: true,
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'donotreply@joonipea.com', // sender address
      to: email, // list of receivers
      subject: "Change your password for Joonipea.com", // Subject line
      text: "Click here to change your password", // plain text body
      html: `<p>Click <a href='${process.env.WHITELISTED_DOMAINS}/user/changepassword?token=${resetToken}&email=${email}'>here</a> to change your password.</p>`, // html body
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    console.log(info)
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  User.findByUsername(req.body.email).then(
    (user) => {
      if (user) {
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            mail(req.body.email, refreshToken);
            res.send('Email sent')
          }
        });
      } else {
        res.send('User not found')
      }
    }
  );
})

module.exports = router;