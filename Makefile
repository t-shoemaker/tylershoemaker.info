.PHONY: clean all

all: docs/publications.json

docs/publications.json: docs/publications.bib
	pandoc $< -f biblatex -t csljson -o $@

clean:
	rm -f docs/publications.json
