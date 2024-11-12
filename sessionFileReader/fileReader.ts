import fs from "fs/promises";
import path from "path"; 

const sessionDir = __dirname.replace("sessionFileReader", "sessions\\")

const fileReader = async () =>
{   
    const sessionInfo = []; 

    try 
    {
        const sessionsDir = path.join(__dirname, "..", "sessions");
    
        const files = await fs.readdir(sessionsDir);
    
        for(const file of files) 
        {
          const filePath = path.join(sessionsDir, file);
    
          const data = await fs.readFile(filePath, "utf-8");
          const sessionData = JSON.parse(data);
          
          //console.log("Session ID", file.replace(".json", "")); 
          //console.log("Session userID:", sessionData.passport.user);

          sessionInfo.push({sessionID:file.replace(".json", ""), userID: sessionData.passport.user });
        }
    } 
    catch (err) 
    {
    console.error("Error reading sessions:", err);
    }
    
    return sessionInfo; 
};

export{fileReader}