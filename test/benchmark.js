const fs = require('node:fs');
const Benchmark = require('benchmark');
const glyphs = require('..');

const fonts = [
  'arialunicode',
  'opensansbold',
  'dinoffcpro'
].map(font => fs.readFileSync(`${__dirname}/fixtures/${font}.0.255.pbf`));

new Benchmark('glyphs.combine three fonts', () => glyphs.combine(fonts))
  .on('complete', event => console.log(String(event.target)))
  .run();
