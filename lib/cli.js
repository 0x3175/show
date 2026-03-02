import { program } from 'commander';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

program
  .version(pkg.version)
  .argument('[word]', 'word to look up')
  .addHelpText('after', `
Examples:
  $ show word
  `);

program.parse(process.argv);

const options = program.opts();
const word = program.args[0];

if (!word) {
  program.outputHelp();
} else {
  import('./dict.js').then(module => {
    module.default(word);
  });
}
