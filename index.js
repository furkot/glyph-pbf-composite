const fs = require('node:fs');
const path = require('node:path');

const protobuf = require('protocol-buffers');

const messages = protobuf(fs.readFileSync(path.join(__dirname, './proto/glyphs.proto')));

function debug(buffer, decode) {
  if (decode) buffer = messages.glyphs.decode(buffer);

  return JSON.stringify(buffer, function (k, v) {
    if (k !== 'bitmap') return v;
    return v ? v.data.length : v;
  }, 2);
}

/**
 * Combine any number of glyph (SDF) PBFs.
 * Returns a re-encoded PBF with the combined
 * font faces, composited using array order
 * to determine glyph priority.
 * @param {array} buffers An array of SDF PBFs.
 */
function combine(buffers, fontstack) {
  let result;
  const coverage = new Set();

  if (!buffers || buffers.length === 0) return;

  for (const buf of buffers) {
    const decoded = messages.glyphs.decode(buf);
    const { glyphs } = decoded.stacks[0];
    if (!result) {
      for (const glyph of glyphs) {
        coverage.add(glyph.id);
      }
      result = decoded;
    } else {
      for (const glyph of glyphs) {
        if (!coverage.has(glyph.id)) {
          result.stacks[0].glyphs.push(glyph);
          coverage.add(glyph.id);
        }
      }
      result.stacks[0].name += ', ' + decoded.stacks[0].name;
    }
  }
  if (fontstack) result.stacks[0].name = fontstack;

  result.stacks[0].glyphs.sort(compareId);

  return messages.glyphs.encode(result);
}

function compareId(a, b) {
  return a.id - b.id;
}

module.exports = {
  combine,
  debug,
  encode: messages.glyphs.encode,
  decode: messages.glyphs.decode
};
