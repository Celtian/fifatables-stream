import { Fifa, fifaConfig, Table } from 'fifatables';
import { join } from 'path';
import { cwd } from 'process';
import { readCsvStream, writeCsvStream } from './lib';

const readCsvStreamDemo = (): void => {
  console.log('⚽⚽⚽ Read csv demo ⚽⚽⚽');

  const inputFolder = join(cwd(), 'examples', Fifa.Fifa11);
  readCsvStream(inputFolder, Table.Leagues, fifaConfig(Fifa.Fifa11).leagues)
    .on('data', (buffer: Buffer) => console.log(JSON.parse(buffer.toString())))
    .on('finish', () => {
      console.log('Reading finished.');
    });
};

const writeCsvStreamDemo = (): void => {
  console.log('⚽⚽⚽ Write csv demo ⚽⚽⚽');

  const inputFolder = join(cwd(), 'examples', Fifa.Fifa11);
  const outputFolder = join(cwd(), 'output', Fifa.Fifa11);
  const table = Table.Leagues;
  const config = fifaConfig(Fifa.Fifa11).leagues;
  const readStream = readCsvStream(inputFolder, table, config);
  writeCsvStream(readStream, outputFolder, table, config)
    .on('data', (buffer: Buffer) => console.log(JSON.parse(buffer.toString())))
    .on('finish', () => {
      console.log('Writing finished.');
    });
};

readCsvStreamDemo();
writeCsvStreamDemo();
