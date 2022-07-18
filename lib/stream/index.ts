import { LineStream } from 'byline';
import { Field, Table } from 'fifatables';
import { createReadStream, createWriteStream, mkdirSync, WriteStream } from 'fs';
import { decodeStream } from 'iconv-lite';
import { join } from 'path';
import { Csv2JsonTransform } from '../transforms/csv2json';
import { Json2CsvTransform } from '../transforms/json2csv';
import { NewLineTransform } from '../transforms/new-line';
import { SkipTransform } from '../transforms/skip';

export type StreamType = NodeJS.ReadWriteStream | WriteStream;

export const readCsvStream = (inputFolder: string, table: Table, fields: Field[]): StreamType => {
  const inputFile = join(inputFolder, `${table}.txt`);
  return createReadStream(inputFile)
    .pipe(decodeStream('utf16le'))
    .pipe(new LineStream({ keepEmptyLines: false }))
    .pipe(new SkipTransform({ count: 1 }))
    .pipe(new Csv2JsonTransform({ fields }));
};

export const writeCsvStream = (
  readStream: StreamType,
  outputFolder: string,
  table: Table,
  fields: Field[]
): StreamType => {
  mkdirSync(outputFolder, { recursive: true });
  const outputFile = join(outputFolder, `${table}.txt`);
  const ws = createWriteStream(outputFile, { encoding: 'utf16le' });
  return readStream.pipe(new Json2CsvTransform({ fields })).pipe(new NewLineTransform()).pipe(ws);
};
