---
date: "2023-01-20T01:23:45.117Z"
description: "Using the common markdown linter and disabling any rules that would intersect with dedicated formatters such as Prettier."
image: me-laughing-on-stage.jpg
title: "Configuring Markdownlint Alongside Prettier"
---

[Linters are not good formatters](https://typescript-eslint.io/linting/troubleshooting/formatting#formatters-vs-linters).
Linters are great at catching bugs, enforcing stylistic decisions such as naming, and detecting violations of best practices - but they're inherently terrible at _formatting_ your code.
Whenever you enable a linter such as [ESLint](https://eslint.org) or [markdownlint](https://github.com/DavidAnson/markdownlint), you should make sure it isn't also trying to format your code.

## Markdownlint

I generally use [markdownlint](https://github.com/DavidAnson/markdownlint) with [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) for linting my Markdown code.
It's fast and straightforward to configure.
You can get started with it by installing it to your project's devDependencies:

```shell
npm i -D markdownlint-cli
```

...then adding a script to run it on all your `.md` files:

```json
{
    "scripts": {
        "lint:md": "markdownlint \"**/*.md\" \".github/**/*.md\""
    }
}
```

## Markdownlint and Prettier

Previously, whenever I configured Markdownlint, I'd add at least the following line in my `.markdownlint.json` to make it not try to apply formatting logic:

```json
// .markdownlint.json
{
    "line-length": false
}
```

Unfortunately, depending on how you [configure Prettier](https://prettier.io/docs/en/configuration.html) (or any other auto-formatter), there are over a _dozen_ Markdownlint rules that might conflict with formatting!

```json
// .markdownlint.json
{
    "blanks-around-fences": false,
    "blanks-around-headings": false,
    "blanks-around-lists": false,
    "code-fence-style": false,
    "emphasis-style": false,
    "heading-start-left": false,
    "hr-style": false,
    "line-length": false,
    "list-indent": false,
    "list-marker-space": false,
    "no-blanks-blockquote": false,
    "no-hard-tabs": false,
    "no-missing-space-atx": false,
    "no-missing-space-closed-atx": false,
    "no-multiple-blanks": false,
    "no-multiple-space-atx": false,
    "no-multiple-space-blockquote": false,
    "no-multiple-space-closed-atx": false,
    "no-trailing-spaces": false,
    "ol-prefix": false,
    "strong-style": false,
    "ul-indent": false
}
```

## `style/prettier.json` To The Rescue

We shouldn't be expected to add any or all of those configurations to every project that uses both Markdownlint and a dedicated formatter.
That's why I [added a `style/prettier.json` extension option to Markdownlint](https://github.com/DavidAnson/markdownlint/pull/594).
Now, instead of adding all those lines to your `.markdownlint.json`, you can include a single `extends` directive:

```json
// .markdownlint.json
{
    "extends": "markdownlint/style/prettier"
}
```

Note that because that file is provided in the `markdownlint` package, you'll want to explicitly have `markdownlint` installed, even though it's already a dependency of `markdownlint-cli`:

```shell
npm i markdownlint@latest markdownlint-cli@latest -D
```

You can read more about configuring Markdownlint alongside Prettier in [Markdownlint's Prettier documentation](https://github.com/DavidAnson/markdownlint/blob/main/doc/Prettier.md).

## Aside: Sentences Per Line

By the way, I wrote my own [`sentences-per-line`](https://github.com/JoshuaKGoldberg/sentences-per-line) Markdownlint rule.
It enforces that each sentence is on its own line (or, in other words, that no line contains more than one sentence).
I like keeping to one sentence per line because it enforces simpler Git diffs and shorter, more readable lines.

```shell
npm i -D sentences-per-line
markdownlint --rules sentences-per-line
```

Anyway, thanks for reading.
I hope you found some of this useful!
🧹
