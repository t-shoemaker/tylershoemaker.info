tylershoemaker.info
===================

This is my personal website.

Deployment
----------

To deploy the site, first create a `.env` file with your credentials:

```sh
DEPLOY_USER=<username>
DEPLOY_HOST=<hostname>
DEPLOY_PATH=<path/to/deploy/directory>
```

Then run:

```sh
make deploy
```

This will sync any changed files on the server via `rsync`. Along the way, it
re-compiles the publications list from a BibTeX file using Pandoc. You can also
manually re-compile that file like so:

```sh
make build
```

Publications
------------

Publications are managed via BibTeX in `docs/publications.bib`. The build
process converts this to CSL-JSON, which is then rendered client-side by
`js/publications.js`.

Supported entry types:

| BibTeX Type     | Category                  |
|-----------------|---------------------------|
| `@article`      | Journal articles          |
| `@incollection` | Book chapters             |
| `@review`       | Reviews                   |
| `@online`       | Essays and public writing |
