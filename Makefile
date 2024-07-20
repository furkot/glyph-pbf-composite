check: lint test

lint:
	./node_modules/.bin/jshint *.js test

test:
	node --test

.PHONY: check lint test
