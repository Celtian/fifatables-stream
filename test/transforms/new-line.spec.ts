import { PassThrough } from 'stream';
import { finished } from 'stream/promises';
import { NewLineTransform } from '../../src/transforms/new-line';

describe('NewLineTransform', () => {
  it('should return correct value', async () => {
    const mockReadable = new PassThrough();
    const chunks: Buffer[] = [];
    const stream = mockReadable.pipe(new NewLineTransform());
    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    mockReadable.end('line 0');
    await finished(stream);

    expect(Buffer.concat(chunks).toString()).toEqual('line 0\r\n');
  });
});
