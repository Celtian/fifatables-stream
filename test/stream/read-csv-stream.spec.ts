import { Fifa, fifaConfig, Table } from 'fifatables';
import { join } from 'path';
import { cwd } from 'process';
import { readCsvStream } from '../../lib/stream';

describe('readCsvStream', () => {
  it('should return correct value', (done) => {
    const inputFolder = join(cwd(), 'test', 'mocks', 'input');

    readCsvStream(inputFolder, Table.Leagues, fifaConfig(Fifa.Fifa11).leagues)
      .on('data', (chunk: Buffer) =>
        expect(chunk.toString()).toEqual(
          '{"countryid":13,"leaguename":"Denmark Superliga (1)","level":1,"leagueid":1,"buildupplay":4}'
        )
      )
      .on('finish', () => done());
  });
});
