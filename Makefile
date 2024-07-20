check: lint test bench

lint:
	./node_modules/.bin/jshint *.js test

test:
	node --test test/test.js

bench:
	node test/benchmark.js

doc:
	documentation readme index.js --section=API

.PHONY: check lint test bench doc
