[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

Modernized clone of @mapbox/glyph-pbf-composite

# glyph-pbf-composite

Combine glyph (SDF) PBFs on the fly.


### `combine(buffers)`

Combine any number of glyph (SDF) PBFs.
Returns a re-encoded PBF with the combined
font faces, composited using array order
to determine glyph priority.

### Parameters

| parameter | type  | description           |
| --------- | ----- | --------------------- |
| `buffers` | array | An array of SDF PBFs. |


## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install @furkot/glyph-pbf-composite
```

## Tests

```sh
$ npm test
```

[npm-image]: https://img.shields.io/npm/v/@furkot/glyph-pbf-composite
[npm-url]: https://npmjs.org/package/@furkot/glyph-pbf-composite

[build-url]: https://github.com/furkot/glyph-pbf-composite/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/furkot/glyph-pbf-composite/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@furkot/glyph-pbf-composite
[deps-url]: https://libraries.io/npm/@furkot%2Fglyph-pbf-composite
