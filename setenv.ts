const { writeFile } = require('fs');

// read environment variables from .env file
require('dotenv').config();

const targetPath = `./src/environments/environment.ts`;

// we have access to our environment variables
const apiURL = process.env.apiURL
  ? process.env.apiURL
  : 'http://sura-edo-cuenta-back-git-siniestros-clientes-dev.apps.qadev-az.segurossura.com.mx/api';

// in the process.env object thanks to dotenv
const environmentFileContent = `export const environment = {
  production: false,
  apiBienestar: "${apiURL}",
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
