import { EOL } from 'os';
import { join } from 'path';
import { command, Command, alias, description, withCallback } from '../../';
import { createCommit } from './createCommit';

import { askQuestions } from './questions';

export const plugin: Command =
  command(alias('commit'), description('Powerful git commit messages'));

withCallback(plugin, ({ config, directory }, io) => {
  const packageNames = (config.packages as Array<string>).map(toPkgName);

 askQuestions(packageNames)
  .then(answers => createCommit(answers, io, directory))
  .catch((err: Error) => {
    io.stderr.write(err + EOL);
  });
});

function toPkgName(path: string) {
  return require(join(path, 'package.json')).name;
}
