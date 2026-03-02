import ora from 'ora';
import chalk from 'chalk';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const CONF = require('./conf.json');
import print from './print.js';

const log = console.log;
const error = (e) => log(chalk.bold.red(e));

export default async (word) => {
  log('');
  const spinner = ora().start();

  try {
    const response = await fetch(CONF.api + word, {
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const data = await response.json();
      error(data.message || `Error: ${response.status} ${response.statusText}`);
    } else {
      const data = await response.json();
      print(data[0]);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      error('Request timed out.');
    } else if (err.name === 'TypeError') {
      error('Please check your internet connection.');
    } else {
      error(err.message);
    }
  } finally {
    spinner.stop();
    log('');
  }
};
