import axios from 'axios';
import ora from 'ora';
import chalk from 'chalk';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const CONF = require('./conf.json');
import print from './print.js';

const log = console.log;
const error = (e) => log(chalk.bold.red(e));

export default (word) => {
  log('');
  const spinner = ora().start();

  axios
    .get(CONF.api + word, {
      timeout: 30000,
    })
    .then(function (res) {
      print(res.data[0]);
    })
    .catch(function (err) {
      if (!err.response) {
        error('Please check your internet connection.');
      } else {
        error(err.response.data.message);
      }
      log('');
    })
    .then(function () {
      spinner.stop();
    });
};
