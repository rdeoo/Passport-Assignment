const database: Express.User[]= 
[
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role:"user"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role:"user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role:"user"
  },
  {
    id: 4,
    name: "Rohan Deo",
    email: "123@gmail.com",
    password: "123",
    role:"admin"
  }
];

const userModel = 
{

  /* FIX ME (types) 😭 ✅Complete*/
  findOne: (email: string) => 
  {
    const user = database.find((user) => user.email === email);
    if (user) 
    {
      return user;
    }
    //throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 ✅Complete*/
  findById: (id: number) => 
  {
    const user = database.find((user) => user.id === id);
    if (user) 
    {
      return user;
    }
    //throw new Error(`Couldn't find user with id: ${id}`);
  },
  isUserInDataBaseViaID: (id: number) => 
  {
    const user = database.find((user) => user.id === id);
    if (user) 
    {
      return user;
    }
    else 
    {
      return null; 
    }
  },
  addToDataBase: (user: Express.User) => 
  {
    database.push(user); 
  },
  isPersonAdmin: (role: string | undefined) =>
  {
    return role == "admin" ? true : false; 
  }
};

export { database, userModel };
