TESTS = $(shell find test/providers  -name "*.test.*")

test:
	@./node_modules/.bin/mocha $(TESTS)


.PHONY: test


