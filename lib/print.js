import chalk from 'chalk';

const log = console.log;

export default (data) => {
  // word & phonetic symbol
  const phonetic = data.phonetics.find(p => p.text);
  const phoneticText = phonetic
    ? chalk.green('  [ ' + phonetic.text + ' ]')
    : '';
  log(data.word + phoneticText);
  log();

  // meaning & example
  if (data.meanings) {
    data.meanings.forEach(function (meaning) {
      const def = meaning.definitions[0];

      log(
        chalk.gray('- ') +
        chalk.magenta('[' + meaning.partOfSpeech + ']') +
        ' ' +
        (def ? chalk.yellow(def.definition) : '')
      );
      if (def && def.example) {
        log('  ' + chalk.cyan(def.example));
      }
      log('');
    });
  }
};
