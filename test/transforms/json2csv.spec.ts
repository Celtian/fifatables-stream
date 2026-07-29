import { Datatype, Field } from 'fifatables';
import { PassThrough } from 'stream';
import { finished } from 'stream/promises';
import { Json2CsvTransform } from '../../src/transforms/json2csv';

describe('Json2CsvTransform', () => {
  it('should return correct value', async () => {
    const mockReadable = new PassThrough();

    const fields: Field[] = [
      {
        name: 'height',
        order: 0,
        type: Datatype.Int,
        default: 180,
        range: { min: 150, max: 215 },
        unique: false
      },
      {
        name: 'weight',
        order: 1,
        type: Datatype.Int,
        default: 80,
        range: { min: 50, max: 115 },
        unique: false
      }
    ];

    const chunks: Buffer[] = [];
    const stream = mockReadable.pipe(new Json2CsvTransform({ fields }));
    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    mockReadable.end('{"height":180,"weight":80}');
    await finished(stream);

    expect(Buffer.concat(chunks).toString()).toEqual('\ufeffheight\tweight\r\n180\t80');
  });
});
