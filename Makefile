-include .env
export

.PHONY: all build deploy clean

EXCLUDES = .env .git .gitignore .htaccess Makefile README.md docs/*.bib
RSYNC_EXCLUDES = $(addprefix --exclude=,$(EXCLUDES))

all: build

docs/publications.json: docs/publications.bib
	pandoc $< -f biblatex -t csljson -o $@

deploy: build
	@[ -f .env ] || (echo "Error: .env file not found"; exit 1)
	rsync -avz $(RSYNC_EXCLUDES) ./ $(DEPLOY_USER)@$(DEPLOY_HOST):$(DEPLOY_PATH)/

clean:
	rm -f docs/publications.json
