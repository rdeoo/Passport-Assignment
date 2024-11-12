import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userModel";
import { fileReader } from "../sessionFileReader/fileReader";

export const isAdmin = async (req: Request, res: Response, next: NextFunction)  => 
{   
    const user = req.user; 

    if(!userModel.isPersonAdmin(user?.role))
    {
       return next(); 
    }

    const sessionInfo = await fileReader();
    //console.log(sessionInfo);

    res.render("admin", {user: req.user ,sessionInfo}); 
}