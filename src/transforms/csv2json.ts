import { Field, formatRawValue, RawData, sortByOrder } from 'fifatables';
import { Transform, TransformCallback, TransformOptions } from 'stream';

export interface Csv2JsonTransformOptions extends TransformOptions {
  fields: Field[];
}

export class Csv2JsonTransform extends Transform {
  private opts: Csv2JsonTransformOptions;

  constructor(opts?: Csv2JsonTransformOptions) {
    super(opts);
    this.opts = opts;
  }

  public _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void {
    const cols = chunk.toString().split(/\t/);
    const { length } = cols;

    if (length === this.opts.fields.length) {
      const object: RawData = this.opts.fields
        .sort(sortByOrder)
        .reduce((acc, field) => ({ ...acc, [field.name]: formatRawValue(field, cols[field.order]) }), {});

      this.push(JSON.stringify(object));
    }
    callback();
  }

  public _flush(callback: TransformCallback): void {
    callback();
  }
}
