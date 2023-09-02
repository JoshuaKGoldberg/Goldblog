---
title: "TypeScript Contribution Diary: Root Directory Validation"
date: "2021-06-09T12:15:15.117Z"
description: "How misbalanced or poorly positioned teams restrict their developers in both the short and long term."
---

![The Roots band performance](./the-roots.jpg)

<em style="display:block;margin-bottom:2rem;text-align:center;">
The Roots performing in Orlando, Florida on their Holiday Tour in 2016
<br />
<small>
File copied from Wikipedia under the Creative Commons Attribution 2.0 Generic license. [<a href="https://en.wikipedia.org/wiki/File:The_Roots_2016_Holiday_Tour_-_Orlando_(31139328734).jpg"  rel="noopener noreferrer"target="_blank">source</a>]
</small>
</em>

## Problem Statement

Did you know TypeScript has a Node API you can call programmatically on code?

```ts
const ts = require("typescript");

const files = {
    "/src/index.ts": "",
    "/invalid.ts": "",
};

const host = ts.createCompilerHost({});
const originalReadFile = host.readFile;
host.readFile = (fileName) => files[fileName] || originalReadFile(fileName);

const options = {
    rootDir: "/src",
    // outDir: "/dist",
    // declaration: true,
};

const program = ts.createProgram(Object.keys(files), options, host);
// program.getCommonSourceDirectory();
console.log(ts.getPreEmitDiagnostics(program));
```

Nifty stuff.

[TypeScript issue #41020 TS6059 diagnostic appears inconsistently](https://github.com/microsoft/TypeScript/issues/41020) noted an issue with that API: the above snippet _should_ be logging a compiler complaint:

```
error TS6059: File '/Users/josh/repos/tstest/invalid.ts' is not under 'rootDir' '/src'. 'rootDir' is expected to contain all source files.
```

However, the TypeScript API would only log that diagnostic complaint if any of the above commented out lines were un-commented.
Normally it wasn't.

Time for me to investigate!

## Context
