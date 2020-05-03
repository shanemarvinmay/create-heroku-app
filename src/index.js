const {Command, flags} = require('@oclif/command')

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
