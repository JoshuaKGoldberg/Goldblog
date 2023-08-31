---
date: "2023-04-30T01:23:45.117Z"
description: "TODO"
image: TODO.jpg
title: "TypeScript Contribution Diary: Removing use-before-its-declaration Errors For Const Enums"
---

![Black cat walking on a holiday light decorated railing towards the viewer, tail held high, looking at the viewer](./jerry-catwalk.jpg)

<em style="display:block;margin-bottom:2rem;text-align:center;">
Jerry the cat showing both his head and tail.
</em>

## Problem Statement

TypeScript supports the concept of `const enum`s: enum objects that are completely erased when compiled to JavaScript.
References to const enum values are replaced with the literal enum values in the JavaScript code.
They're useful in situations where you want to have an enum to describe a shared set of values, but don't want to create runtime objects.

Note that TypeScript does have a [`preserveConstEnum` compiler option](https://www.typescriptlang.org/tsconfig#preserveConstEnums) that indicates TypeScript should create an object for `const` `enum`s.
But value references are still inlined to their literal equivalent.

> todo: formatting & syntax highlighting ... let's do this after the Astro switch lol

<table>
    <thead>
        <tr>
            <th>Before</th>
            <th>After</th>
            <th>After (<code>preserveConstEnums=true</code>)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>const enum Fruit {
    Apple,
    Banana,
}

console.log("Apple:", Fruit.Apple);
</code>

</td>
<td>
<code>console.log("Apple:", 0 /_ Fruit.Apple _/);</code>
</td>
<td>
<code>
var Fruit;
(function (Fruit) {
Fruit[(Fruit["Apple"] = 0)] = "Apple";
Fruit[(Fruit["Banana"] = 1)] = "Banana";
})(Fruit || (Fruit = {}));

console.log("Apple:", 0 /_ Fruit.Apple _/);
</code>

<tr>
</tbody>

</table>

TypeScript's [issue #53019 used before its declaration error when preserveConstEnums=true](https://github.com/microsoft/TypeScript/issues/53019) points out that TypeScript reports an error if you refer to a `const` `enum` in code before the enum's declaration:

```ts
export const config = {
    a: Fruit.Apple,
    //     ~~~~~ Enum 'Apple' used before its declaration.
};

const enum Fruit {
    Apple,
    Banana,
}
```

That error makes sense for non-`const` `enum`s because they're a real value at runtime, and wouldn't exist yet if referred to before their declaration.
But it doesn't make sense for `const` `enum`s - their value references are replaced with literals!

The issue was marked as accepting pull requests to remove the _used-before-its-declaration_ error for specifically `const` `enum`s.

## Investigating

My starting question was: where does Typescript emit the error for `const` `enum`s?

I searched the TypeScript codebase's `.ts` files for `/enum.*used.*before.*its.*declaration/` (the words from the error, with anything in-between them).
That search found two locations, both in `src/compiler/checker.ts` (the source code for TypeScript's type checking) and right next to each other inside a function called `checkResolvedBlockScopedVariable`:

```ts
else if (result.flags & SymbolFlags.RegularEnum) {
    diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
}
else {
    Debug.assert(!!(result.flags & SymbolFlags.ConstEnum));
    if (shouldPreserveConstEnums(compilerOptions)) {
        diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
    }
}
```

Skimming through that code, it looks like was reporting any needed error for a variable used before its declaration.
The first `if` was for a "regular" `enum`, and the second asserted it must be a `const` `enum`.

It seemed like we could remove the second one?
Was it that straightforward?

> Spoiler: yes! 🙌

## Running Tests

(todo rewrite)

only one test failed

tests/baselines/reference/blockScopedEnumVariablesUseBeforeDef_preserve.errors.txt

looks good!

the I added the test case from the issue

```ts
const config = {
    a: AfterObject.A,
};

const enum AfterObject {
    A = 2,
}
```
