import chalk from 'chalk';

const log = console.log;

export default (data) => {
  // word & phonetic symbol
  const phonetic = data.phonetics[0]
    ? chalk.green('  [ ' + data.phonetics[0].text + ' ]')
    : '';
  log(data.word + phonetic);
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
