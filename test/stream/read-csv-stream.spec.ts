import { Fifa, fifaConfig, Table } from 'fifatables';
import { join } from 'path';
import { cwd } from 'process';
import { finished } from 'stream/promises';
import { readCsvStream } from '../../src/stream';

describe('readCsvStream', () => {
  it('should return correct value', async () => {
    const inputFolder = join(cwd(), 'test', 'mocks', 'input');
    const chunks: Buffer[] = [];
    const stream = readCsvStream(inputFolder, Table.Leagues, fifaConfig(Fifa.Fifa11).leagues);

    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    await finished(stream);

    expect(Buffer.concat(chunks).toString()).toEqual(
      '{"countryid":13,"leaguename":"Denmark Superliga (1)","level":1,"leagueid":1,"buildupplay":4}'
    );
  });
});
