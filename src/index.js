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
// && cp -R ./heroku-express ../ && mv ../heroku-express/ ../${name}
const createExpressApp = async (name) => {
  exec(`git clone https://github.com/shanemarvinmay/heroku-express && mv ./heroku-express ./${name} `, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    // console.log(`stdout: ${stdout}`);
  });
}
const createDjangoApp = async (name) => {
  exec(`cp -R ./heroku-django ../ && mv ../heroku-django/ ../${name}`, (error, stdout, stderr) => {
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
const createScalaApp = async (name) => {
  exec(`cp -R ./heroku-scala ../ && mv ../heroku-scala/ ../${name}`, (error, stdout, stderr) => {
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
const createClojureApp = async (name) => {
  exec(`cp -R ./heroku-clojure ../ && mv ../heroku-clojure/ ../${name}`, (error, stdout, stderr) => {
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
const createGoApp = async (name) => {
  exec(`cp -R ./heroku-go ../ && mv ../heroku-go/ ../${name}`, (error, stdout, stderr) => {
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
const createPhpApp = async (name) => {
  exec(`cp -R ./heroku-php ../ && mv ../heroku-php/ ../${name}`, (error, stdout, stderr) => {
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
const createJavaApp = async (name) => {
  exec(`cp -R ./heroku-java ../ && mv ../heroku-java/ ../${name}`, (error, stdout, stderr) => {
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
const createRubyApp = async (name) => {
  exec(`cp -R ./heroku-ruby ../ && mv ../heroku-ruby/ ../${name}`, (error, stdout, stderr) => {
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
    // copy over heroku express project 
    if( typeOfApp == 'express' ) {
      createExpressApp(name);
    }
    else if( typeOfApp == 'django' ) {
      createDjangoApp(name);
    }
    else if( typeOfApp == 'scala' ) {
      createScalaApp(name);
    }
    else if( typeOfApp == 'clojure' ) {
      createClojureApp(name);
    }
    else if( typeOfApp == 'go' ) {
      createGoApp(name);
    }
    else if( typeOfApp == 'java' ) {
      createJavaApp(name);
    }
    else if( typeOfApp == 'php' ) {
      createPhpApp(name);
    }
    else if( typeOfApp == 'ruby' ) {
      createRubyApp(name);
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
