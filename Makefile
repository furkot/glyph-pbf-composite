check: lint test bench

lint:
	./node_modules/.bin/biome ci

format:
	./node_modules/.bin/biome check --fix

test:
	node --test $(TEST_OPTS) test/test.js

test-cov: TEST_OPTS := --experimental-test-coverage
test-cov: test

bench:
	node test/benchmark.js

doc:
	documentation readme index.js --section=API
.PHONY: check format lint test test-cov bench doc
