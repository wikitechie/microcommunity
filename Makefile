TESTS = $(shell find test/providers  -name "*.test.coffee")

test:
	@./node_modules/.bin/mocha $(TESTS)


.PHONY: test


