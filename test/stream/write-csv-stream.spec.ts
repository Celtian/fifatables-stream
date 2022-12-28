import { Fifa, fifaConfig, Table } from 'fifatables';
import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { readCsvStream, writeCsvStream } from '../../src/stream';

describe('writeCsvStream', () => {
  it('should return correct value', (done) => {
    const inputFolder = join(cwd(), 'test', 'mocks', 'input');
    const outputFolder = join(cwd(), 'test', 'mocks', 'output');

    const table = Table.Leagues;
    const config = fifaConfig(Fifa.Fifa11).leagues;
    const readStream = readCsvStream(inputFolder, table, config);
    writeCsvStream(readStream, outputFolder, table, config).on('finish', () => {
      const file = readFileSync(join(outputFolder, `${Table.Leagues}.txt`)).toString();
      expect(file).toEqual(
        '\ufeffcountryid\tleaguename\tlevel\tleagueid\tbuildupplay\r\n13\tDenmark Superliga (1)\t1\t1\t4\r\n'
      );
      done();
    });
  });
});
