const {Command, flags} = require('@oclif/command');
const { exec } = require("child_process");
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
// how to check for a module 
try {
  console.log(require.resolve("express"));
} catch(e) {
  console.log('Express is not installed.\nInstalling now...');
  exec("npm install express", (error, stdout, stderr) => {
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

class CreateHerokuAppCommand extends Command {
  async run() {
    const {flags} = this.parse(CreateHerokuAppCommand)
    // const name = flags.name || 'world';
    const typeOfApp = flags.type || 'Unknown';
    if(typeOfApp == 'Unknown'){
      this.log(`Error: App type unkown.`);
      return;
    }
    this.log(`App type selected: ${typeOfApp}`);
    // this.log(`hello ${name} from ./src/index.js`);
  }
}

CreateHerokuAppCommand.description = `Describe the command here
...
Extra documentation goes here
`

CreateHerokuAppCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  // name: flags.string({char: 'n', description: 'name to print'}),
  type: flags.string({char: 't', description: 'type of app'}),
}

module.exports = CreateHerokuAppCommand
