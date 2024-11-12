import express from "express";
import dotenv from "dotenv" 
import FileStore from "session-file-store"
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import flash from 'connect-flash'
import passportMiddleware from './middleware/passportMiddleware';
import { fileReader } from "./sessionFileReader/fileReader";

const port = process.env.port || 8000;

const app = express();

const fileStore = FileStore(session); 

dotenv.config(); 

declare global
{
  namespace Express
  {
    interface User
    {
      id?: number;
      name?: string;
      email?: string; 
      password?: string; 
      role: string;
    }
  }
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new fileStore(),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

 
// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

app.use(async (req, res, next) => 
{
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);

  console.log(`Session Store details are: `);
  console.log(await fileReader()); 
  //if(req.sessionStore.all !== undefined)
  //{
    //req.sessionStore.all((err , sessions) => {
      //if(err) console.log(err);
      //console.log(sessions);
      
    //})
  //}
  //else
  //{
    //console.log("Func is not defined.");
  //}
  
  
  next();
});

//app.use(flash());

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => 
{
  console.log(`🚀 Server has started on port ${port}`);
});
