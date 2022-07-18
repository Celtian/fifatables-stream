<p align="center">
  <a href="https://github.com/Celtian/fifatables-stream" target="blank"><img src="assets/logo.svg?sanitize=true" alt="" width="120"></a>
  <h1 align="center">fifatables-stream</h1>
</p>

[![npm version](https://badge.fury.io/js/fifatables-stream.svg)](https://badge.fury.io/js/fifatables-stream)
[![Package License](https://img.shields.io/npm/l/fifatables-stream.svg)](https://www.npmjs.com/fifatables-stream)
[![NPM Downloads](https://img.shields.io/npm/dm/fifatables-stream.svg)](https://www.npmjs.com/fifatables-stream)
[![Build & Publish](https://github.com/celtian/fifatables-stream/workflows/Build%20&%20Publish/badge.svg)](https://github.com/celtian/fifatables-stream/actions)
[![codecov](https://codecov.io/gh/Celtian/fifatables-stream/branch/master/graph/badge.svg?token=1IRUKIKM0D)](https://codecov.io/gh/celtian/fifatables-stream/)
[![stars](https://badgen.net/github/stars/celtian/fifatables-stream)](https://github.com/celtian/fifatables-stream/)
[![forks](https://badgen.net/github/forks/celtian/fifatables-stream)](https://github.com/celtian/fifatables-stream/)
[![HitCount](http://hits.dwyl.com/celtian/fifatables-stream.svg)](http://hits.dwyl.com/celtian/fifatables-stream)

> Library that provides stream for reading or writing data of Fifa Soccer tables

## Install

_Nodejs 12 or higher need to be installed first_

```terminal
npm install fifatables-stream
```

or

```terminal
yarn add fifatables-stream
```

## Quick start

_Type this into your ts file._

```terminal
  import { join } from 'path';
  import { cwd } from 'process';
  import { Fifa, fifaConfig, Table } from 'fifatables';
  import { readCsvStream, writeCsvStream } from 'fifatables-stream';

  // read league.txt from Fifa 11
  readCsvStream(join(cwd(), 'examples', Fifa.Fifa11), Table.Leagues, fifaConfig(Fifa.Fifa11).leagues)
    .on('data', (buffer: Buffer) => console.log(JSON.parse(buffer.toString())))
    .on('finish', () => console.log('Reading finished.'));

  // read league.txt from Fifa 11 and write it in Fifa 21 format
  const table = Table.Leagues;
  const readStream = readCsvStream(join(cwd(), 'examples', Fifa.Fifa11), table, fifaConfig(Fifa.Fifa11).leagues);
  writeCsvStream(readStream, join(cwd(), 'output', Fifa.Fifa21), table, fifaConfig(Fifa.Fifa21).leagues)
    .on('data', (buffer: Buffer) => console.log(JSON.parse(buffer.toString())))
    .on('finish', () => console.log('Writing finished.'));
```

## Supported versions of Fifa Soccer

See library [fifatables](https://www.npmjs.com/package/fifatables).

## Supported tables

See library [fifatables](https://www.npmjs.com/package/fifatables).

## License

Copyright &copy; 2022 [Dominik Hladik](https://github.com/Celtian)

All contents are licensed under the [MIT license].

[mit license]: LICENSE