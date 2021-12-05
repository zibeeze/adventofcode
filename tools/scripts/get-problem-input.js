const createWriteStream = require('fs').createWriteStream;
const pipeline = require('stream').pipeline;
const promisify = require('util').promisify;
const fetch = require('node-fetch');
const env = require('process').env;

let params = {};
process.argv.forEach(function (val, index, array) {
  if (val.startsWith('--')) {
    const split = val.split('=');
    const paramName = split[0].substring(2);
    params[paramName] = split[1];
  }
});

async function getProblemInput(day, year) {
  const streamPipeline = promisify(pipeline);
  const opts = {
    headers: {
      cookie: `session=${env.AOC_SESSION};`,
    },
  };
  const response = await fetch(
    `https://adventofcode.com/20${year}/day/${day}/input`,
    opts
  );
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);
  await streamPipeline(
    response.body,
    createWriteStream(`./libs/${year}/${day}/src/lib/prob-input.txt`)
  );
}

getProblemInput(params['day'], params['year']);
