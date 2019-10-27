// USAGE:
// const data = database('/data');

// data.commit(
//   data.define('actors', {
//     cash: data.num,
//   }),
//   data.define('positions', {
//     cash: data.num,
//     actorId: data.ref('actors'),
//     symbol: data.str,
//     quantity: data.int
//   }),
//   data.define('transactions', {
//     actorId: data.ref('actors'),
//     timestamp: data.iso,
//     action: data.enum('buy', 'sell'),
//     symbol: data.str,
//     quantity: data.int,
//     price: data.num,
//   }),
// )

import {
  Commit,
  CommitMaterial,
  FileManager
} from './entities';
import { fileManager } from './file-manager';

export function database(dirpath) {
  const fm = fileManager(dirpath)
  return {
    define,
    commit: makeCommiter(fm)
  }
}

function define(table, fields): CommitMaterial {
  return { table, mutation: 'define', payload: fields }
}

function makeCommiter(fm:FileManager) {
  return async function(cm:CommitMaterial): Promise<Error|Commit> {
    return await fm.commit(cm);
  }
}