import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { userModel } from "../../models/userModel";
import { PassportStrategy } from '../../interfaces/index';
import { ErrorMessage } from "./errorHandling"

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    
    const user = userModel.findOne(email); 

    if(user)
    {
      if(user.password == password)
      {
        done(null, user); 
      }
      else
      { 
        ErrorMessage.setError("Password is incorrect");
        done(null,false); 
      }
    }
    else
    { 
      ErrorMessage.setError(`Couldn't find user with email: ${email}`);
      done(null,false);
    }
  }
);

/*
FIX ME (types) 😭 ✅Complete
*/
passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) 
{
  done(null, user.id);
});

/*
FIX ME (types) 😭 ✅Complete
*/
passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User | false | null) => void) 
{
  let user = getUserById(id);
  if (user) 
  {
    done(null, user);
  } 
  else 
  {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = 
{
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
