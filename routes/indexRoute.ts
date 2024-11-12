import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { isAdmin } from "../middleware/checkAdminStatus";


router.get("/", (req, res) => 
{
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => 
{
  res.render("dashboard", 
  {
    user: req.user,
  });
});

router.get("/admin", isAdmin, (req, res) =>
{ 
  res.redirect("/dashboard");
})

router.post("/admin/sessions/delete/:sessionID", async(req , res) =>
{
  const {sessionID} = req.params; 

  console.log("Deleting Session: " , sessionID);

  await new Promise((resolve, reject) => 
  {
    req.sessionStore.destroy(sessionID, (err) => 
    {
      if (err) 
      {
        console.log(err);
        reject(err);
      }
      else
      {
        resolve(console.log("Session deleted"));
      }
    });
  });

  console.log("Redirecting to admin");
  res.redirect("/admin");
})
export default router;
