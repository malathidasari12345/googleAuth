const router = require("express").Router();
const passport = require("../passport");

router.get("/login", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});
router.get("/login/fail", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/fail",
  })
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
