const fs = require('node:fs');
const Benchmark = require('benchmark');
const glyphs = require('..');
const arialUnicode0255 = fs.readFileSync(__dirname + '/fixtures/arialunicode.0.255.pbf');
const openSans0255 = fs.readFileSync(__dirname + '/fixtures/opensansbold.0.255.pbf');
const dinoffcpro0255 = fs.readFileSync(__dirname + '/fixtures/dinoffcpro.0.255.pbf');

new Benchmark('glyphs.combine three fonts', () => {
    glyphs.combine([arialUnicode0255, openSans0255, dinoffcpro0255]);
  })
  .on('complete', event => console.log(String(event.target)))
  .run();
