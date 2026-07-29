import { Datatype, Field, sortByOrder } from 'fifatables';
import { Transform, TransformCallback, TransformOptions } from 'stream';

export interface Json2CsvTransformOptions extends TransformOptions {
  fields: Field[];
}

export class Json2CsvTransform extends Transform {
  private opts: Json2CsvTransformOptions;
  private line = 0;

  constructor(opts?: Json2CsvTransformOptions) {
    super(opts);
    this.opts = opts;
  }

  public _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void {
    const lines: string[] = [];
    const orderedFields = this.opts.fields.sort(sortByOrder);
    if (this.line === 0) {
      lines.push('\ufeff' + orderedFields.map((f) => f.name).join('\t'));
    }
    const parsedValue: unknown = JSON.parse(chunk.toString());
    if (typeof parsedValue !== 'object' || parsedValue === null) {
      callback(new TypeError('Expected a JSON object'));
      return;
    }
    const oldValue = parsedValue as Record<string, unknown>;

    lines.push(
      orderedFields
        .map((f) => {
          const value = oldValue[f.name];
          if (value === null || value === undefined) {
            return '';
          }
          if (
            typeof value !== 'string' &&
            typeof value !== 'number' &&
            typeof value !== 'boolean' &&
            typeof value !== 'bigint'
          ) {
            throw new TypeError(`Expected a primitive value for field "${f.name}"`);
          }
          const stringValue = String(value);
          if (f.type === Datatype.Float) {
            return stringValue.replace('.', ',');
          }
          return stringValue;
        })
        .join('\t')
    );

    this.push(lines.join('\r\n'));

    this.line++;
    callback();
  }

  public _flush(callback: TransformCallback): void {
    this.line = 0;
    callback();
  }
}
