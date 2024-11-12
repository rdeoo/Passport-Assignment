import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { userModel } from '../../models/userModel';
import dotenv from "dotenv"

dotenv.config(); 

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭  ✅Complete*/
    async (req: Request, 
           accessToken: string, 
           refreshToken: string | undefined, 
           profile: Profile, 
           done: (err: any, user?: Express.User | false | null) => void) => 
    {
        const githubUser = 
        {
            id: Number(profile.id), 
            name: profile.username,
            role: "user" 
        };

        const userInDataBase = userModel.isUserInDataBaseViaID(githubUser.id);
        
        if(!userInDataBase)
        {
            userModel.addToDataBase(githubUser); 
            done(null, githubUser); 
        }
        else
        {
            done(null , userInDataBase); 
        }
    },
);

const passportGitHubStrategy: PassportStrategy = 
{
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
