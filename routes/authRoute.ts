import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";
import { ErrorMessage } from "../middleware/passportStrategies/errorHandling";

const router = express.Router();

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) 
  {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

router.get("/login", forwardAuthenticated, (req, res) => 
{
  //const errorMsg = req.flash("error"); 
  const errorMsg = ErrorMessage.error; 
  ErrorMessage.setError("");

  console.log(errorMsg)
  res.render("login", {errorMsg});
})

router.post(
  "/login",
  passport.authenticate("local", 
  {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails  ✅Complete*/
    //failureFlash: true
  })
);

router.get("/logout", (req, res) => 
{
  req.logout((err) => 
  {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
