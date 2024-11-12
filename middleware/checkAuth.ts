import { NextFunction, Request, Response } from "express";

/*
FIX ME (types) ✅Complete😭
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => 
{
  if (req.isAuthenticated()) 
  {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭 ✅Complete
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => 
{
    if (!req.isAuthenticated()) 
    {
      return next();
    }
    res.redirect("/dashboard");
}