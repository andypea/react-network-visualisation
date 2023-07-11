# Developer docs

## Getting started

After checking out this repository execute one of the following commands to use the repositories custom `.gitconfig`.
This will ensure the repositories custom Git hooks will be used.

```sh
npm run include-local-gitconfig
```

or

```sh
git config --local include.path ../.gitconfig
```

## Making a release

## Babel

Babel is only used by Storybook.
Typescript (tsc) is used, via rollup, to build releases and generate type description (d.ts) files.
