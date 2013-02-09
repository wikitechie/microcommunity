TESTS = $(shell find test/controllers  -name "*.test.js")

test:
	@./node_modules/.bin/mocha $(TESTS)


.PHONY: test


