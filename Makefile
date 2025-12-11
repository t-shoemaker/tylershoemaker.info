.PHONY: all build deploy clean

EXCLUDES = .git .gitignore .htaccess Makefile docs/*.bib
RSYNC_EXCLUDES = $(addprefix --exclude=,$(EXCLUDES))

all: build

docs/publications.json: docs/publications.bib
	pandoc $< -f biblatex -t csljson -o $@

deploy: build
	rsync -avz $(RSYNC_EXCLUDES) ./ tylersho@tylershoemaker.info:~/public_html/

clean:
	rm -f docs/publications.json
