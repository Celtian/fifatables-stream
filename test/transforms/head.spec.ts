import { PassThrough } from 'stream';
import { finished } from 'stream/promises';
import { HeadTransform } from '../../src/transforms/head';

describe('HeadTransform', () => {
  it('should return correct value', async () => {
    const mockReadable = new PassThrough();
    const chunks: Buffer[] = [];
    const stream = mockReadable.pipe(new HeadTransform({ count: 1 }));
    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    mockReadable.write('line 0');
    mockReadable.end('line 1');
    await finished(stream);

    expect(Buffer.concat(chunks).toString()).toEqual('line 0');
  });
});
