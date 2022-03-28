const { writeFile } = require('fs');

// read environment variables from .env file
require('dotenv').config();

const targetPath = `./src/environments/environment.ts`;

// we have access to our environment variables
const apiBienestar = process.env.apiBienestar ? process.env.apiBienestar : 'http://20.44.111.201:8082/api/bienestar';
const bienestarAuth = process.env.bienestarAuth ? process.env.bienestarAuth : 'http://40.75.110.145:8182/api/bienestar-auth';
const bienestarURL = process.env.bienestarURL ? process.env.bienestarURL : 'http://frontbienestar-dev.azurewebsites.net';
const loginURL = process.env.loginURL ? process.env.loginURL : 'http://loginfront-dev.azurewebsites.net';
const loginURLAlianza = process.env.loginURLAlianza ? process.env.loginURLAlianza : 'http://alianzasfront-dev.azurewebsites.net';
const alianzasURL = process.env.alianzasURL ? process.env.alianzasURL : 'http://alianzasfront-dev.azurewebsites.net';
const keyCapchat = process.env.keyCapchat ? process.env.keyCapchat : '6LdVfAAfAAAAAKfKHsEwrPOWZUQKyPsitb7tN_Bd';


// in the process.env object thanks to dotenv
const environmentFileContent = `export const environment = {
  production: false,
  apiBienestar: "${apiBienestar}",
  bienestarAuth: "${bienestarAuth}",
  bienestarURL: "${bienestarURL}",
  loginURL: "${loginURL}",
  loginURLAlianza: "${loginURLAlianza}",
  alianzasURL: "${alianzasURL}",
  keyCapchat: "${keyCapchat}",
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }   console.log(`Wrote variables to ${targetPath}`);
});
