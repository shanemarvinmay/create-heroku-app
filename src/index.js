const { Command, flags } = require('@oclif/command');
const { exec } = require("child_process");
const fs = require('fs');
// how to run commands 
// exec("ls", (error, stdout, stderr) => {
//   if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//   }
//   if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//   }
//   console.log(`stdout: ${stdout}`);
// });

const checkArgs = (name, type) => {
  let error = null;
  if (name == 'Unknown') {
    error = `Error: App name unkown.\n`;
  }
  if (type == 'Unknown') {
    error += `Error: App type unkown.\n`;
  }
  return error;
};
const expressInit = async (name) => {
  // how to check for a express 
  exec(`cd ../${name} && npm init -y && npm install express`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout:\n ${stdout}`);
  });
}
const makeProject = async (name) => {
  exec(`cd .. && mkdir ${name} && cd ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
const createExpressApp = async (name) => {
  exec(`cp -R ./heroku-express ../ && mv ../heroku-express/ ../${name}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
class CreateHerokuAppCommand extends Command {
  async run() {
    const { flags } = this.parse(CreateHerokuAppCommand)
    const name = flags.name || 'Unknown';
    const typeOfApp = flags.type || 'Unknown';
    // checking for errors 
    const error = checkArgs(name, typeOfApp);
    if (error != null) {
      this.log(error);
      return;
    }
    // making project 
    // try {
    //   await makeProject(name);
    // } catch (e) {
    //   console.log('proj already exist');
    // }
    // await expressInit(name);
    // copy over heroku express project 
    if( typeOfApp == 'express' ) {
      createExpressApp(name);
    }
    this.log(`App type selected: ${typeOfApp}`);
    this.log(`App name given: ${name}`);
  }
}

CreateHerokuAppCommand.description = `Describe the command here
...
Extra documentation goes here
`

CreateHerokuAppCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  name: flags.string({ char: 'n', description: 'name of project' }),
  type: flags.string({ char: 't', description: 'type of app' }),
}

module.exports = CreateHerokuAppCommand
