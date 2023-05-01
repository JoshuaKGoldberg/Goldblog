---
date: "2023-05-01T12:34:56.118Z"
description: "How I recommend getting your formatter, linter, and type checker to play together nicely."
image: react-miami-me-speaking-alt.jpg
title: "Configuring ESLint, Prettier, and TypeScript Together: FAQs"
---

These are common questions and my answers for my [Configuring ESLint, Prettier, and TypeScript Together](../configuring-eslint-prettier-and-typescript-together) article.

Let me know if you have any other questions to add!

## What is `eslint-config-prettier`?

[`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier) is a utility package containing an ESLint configuration that explicitly turns off all common ESLint rules that are unnecessary or might conflict with Prettier.
It's useful if you're extending from a shared ESLint config that still enables formatting rules:

```js
// eslintrc.js
module.exports = {
    extends: [
        "some-shared-config-that-enables-formatting-rules-ugh",
        "prettier", // or: "eslint-config-prettier"
    ],
};
```

Note that the recommended configurations in ESLint core, typescript-eslint, and all the plugins I've been using recently intentionally don't enable any rules that conflict with Prettier.
That means you generally don't need to enable `eslint-config-prettier` with them.
I don't use it in my [`template-typescript-node-package`](https://github.com/JoshuaKGoldberg/template-typescript-node-package).

## What is `eslint-plugin-prettier`?

[`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier) is an ESLint plugin that creates a lint rule whose entire purpose is to run Prettier and report its complaints & fixes through that lint rule.

I strongly advise not using `eslint-plugin-prettier` for two reasons:

-   It slows formatting down to the speed of your linter. Which, if you're using [type-aware lint rules](https://typescript-eslint.io/linting/typed-linting) (as you generally should in TypeScript projects), should be much slower than running the formatter on its own.
-   Combining formatting complaints and lint complaints into one report is clunky and confusing. You'll often see large swathes of editor squigglies that may or may not be real logical complaints. New users have enough trouble understanding the differences between formatters and linters!

## Why not use ESLint for formatting?

I strongly recommend against using ESLint for formatting.
I strongly recommend using [Prettier](https://prettier.io), [dprint](https://dprint.dev), or another dedicated formatter instead.
The [typescript-eslint _What About Formatting?_ page](https://typescript-eslint.io/linting/troubleshooting/formatting) explains this in more detail.

## What about TSLint?

[TSLint](https://palantir.github.io/tslint) was a linter built for specifically TypeScript code.
It was very similar to ESLint, but used a TypeScript AST internally instead of the standard JavaScript tree shape (ESTree).

The TSLint project was deprecated _years_ ago.
I helped kill it.

The [typescript-eslint _What About TSLint?_ page](https://typescript-eslint.io/linting/troubleshooting/tslint) covers TSLint in more detail.

> Tip: people sometimes refer to TypeScript's complaints as "tslint" or "the tslinter".
> That's inaccurate and confusing.

## Closing Thoughts

Thanks for reading! 💖

Got any more FAQs you'd like to see here?
Please let me know over [email](mailto:blog@joshuakgoldberg.com), [Masstodon](https://fosstodon.org/@JoshuaKGoldberg), or [Twitter](https://twitter.com/JoshuaKGoldberg)!
