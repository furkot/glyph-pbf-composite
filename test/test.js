const test = require('node:test');
const assert = require('node:assert');

const glyphs = require('../index');
const fs = require('fs');

const openSans512 = fs.readFileSync(__dirname + '/fixtures/opensans.512.767.pbf');
const arialUnicode512 = fs.readFileSync(__dirname + '/fixtures/arialunicode.512.767.pbf');
const league512 = fs.readFileSync(__dirname + '/fixtures/league.512.767.pbf');
const composite512 = fs.readFileSync(__dirname + '/fixtures/opensans.arialunicode.512.767.pbf');
const triple512 = fs.readFileSync(__dirname + '/fixtures/league.opensans.arialunicode.512.767.pbf');

test('compositing two pbfs', function () {
  let composite = glyphs.decode(glyphs.combine([openSans512, arialUnicode512]));
  let expected = glyphs.decode(composite512);

  assert(composite.stacks, 'has stacks');
  assert.equal(composite.stacks.length, 1, 'has one stack');

  const stack = composite.stacks[0];

  assert(stack.name, 'is a named stack');
  assert(stack.range, 'has a glyph range');
  assert.deepEqual(composite, expected, 'equals a server-composited stack');

  composite = glyphs.encode(composite);
  expected = glyphs.encode(expected);

  assert.deepEqual(composite, expected, 're-encodes nicely');

  const recomposite = glyphs.decode(glyphs.combine([league512, composite]));
  const reexpect = glyphs.decode(triple512);

  assert.deepEqual(recomposite, reexpect, 'can add on a third for good measure');
});

test('compositing and providing fontstack string name', function () {
  const name = 'Open Sans Regular,Arial Unicode MS Regular';
  const composite_name = glyphs.decode(glyphs.combine([openSans512, arialUnicode512], name));
  const composite_noname = glyphs.decode(glyphs.combine([openSans512, arialUnicode512]));
  const expected = glyphs.decode(composite512);

  assert(composite_name.stacks, 'has stacks');
  assert.equal(composite_name.stacks.length, 1, 'has one stack');

  assert.deepEqual(composite_noname, expected);
  assert.notEqual(composite_name, expected, 'not equal when provided non-spaced stack name');
  assert.deepEqual(composite_name.stacks[0].glyphs, composite_noname.stacks[0].glyphs);
  assert.deepEqual(composite_name.stacks[0].range, composite_noname.stacks[0].range);

  assert.equal(composite_name.stacks[0].name, name, 'returns stacks with provided name');
});

test('debug method shows decoded glyphs', function () {
  const something = glyphs.debug(openSans512, true);
  assert.doesNotThrow(function () { JSON.parse(something); });
  assert.equal(JSON.parse(something).stacks[0].glyphs.length, 16);

  const decoded = glyphs.debug(glyphs.decode(openSans512));
  assert.doesNotThrow(function () { JSON.parse(decoded); });
  assert.equal(JSON.parse(something).stacks[0].glyphs.length, 16);
});

test('returns nothing when given nothing', function () {
  assert.equal(glyphs.combine([]), undefined);
});

test('can composite only one pbf', function () {
  const composite = glyphs.decode(glyphs.combine([openSans512]));
  const expected = glyphs.decode(openSans512);

  assert.deepEqual(composite, expected, 'doesn\'t break itself');
});

test('can composite more than two', function () {
  const composite = glyphs.decode(glyphs.combine([league512, openSans512, arialUnicode512]));
  const expected = glyphs.decode(triple512);

  assert.deepEqual(composite, expected, 'can composite three');
});
