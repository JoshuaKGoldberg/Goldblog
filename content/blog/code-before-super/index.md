---
date: "2022-03-07T12:34:56.117Z"
description: "Allowing derived classes with properties to include code before `super()` that doesn't touch `this`. A grand pull request three years in the making -- with cake!"
image: cake.jpg
title: "TypeScript Contribution Diary: Allowing Code in Constructors Before `super()`"
---

![Fancy blue and white circular cake with text "Happy 3rd Birthday, #293374" and "Bump for PR review please!" above the TypeScript logo](./cake.jpg)

<em style="display:block;margin-bottom:2rem;text-align:center;">
A cake I ordered to commemorate the pull request being open for three years.
<br />
<small>
I'd wanted to send it to the TypeScript team, but Daniel Rosenwasser informed me the team was still remote for COVID in January of 2022.
I ended up eating an unhealthy amount of the cake myself.
</small>
</em>

[#8277: Always allow code before super call when it does not use "this"](https://github.com/microsoft/TypeScript/issues/8277) is one of TypeScript's oldest highly-upvoted issues.
It asks for more leniency in allowing code before a `super(...)` call inside a class constructor.
Back in 2019, I thought it'd be a fun medium-sized challenge to fix the issue.

I was so wrong.
Very, very wrong.

It took three years (albeit mostly waiting for pull request review) and a micro-viral tweet about sending the TypeScript team a cake to get this fix merged.

✨ [#29374: Allowed non-this, non-super code before super call in derived classes with property initializers](https://github.com/microsoft/TypeScript/pull/29374) ✨

My previous _TypeScript Contribution Diary_ posts were structured as stories explaining the timeline of how those changes made it in.
This entry's pull request had 159 comments over three years -- far too many for that format.

Instead, I'll give a high-level overview of the backing issue's context, the pull request's strategy, and general code changes.

Let's dig in! 🍰

> This contribution diary post assumes you've read through previous entries and/or are already familiar with how JavaScript compilers and type checkers work.
> If that's not the case, no worries!
> Read through a previous entry such as [TypeScript Contribution Diary: Improved Syntax Error for Enum Member Colons](https://blog.joshuakgoldberg.com/enum-commas) and Andrew Branch's [Debugging the TypeScript Codebase](https://blog.andrewbran.ch/debugging-the-type-script-codebase).

## Problem Statement

One quirk of classes in many languages, including JavaScript, is that inside the constructor of a _derived_ class (one that `extends` a _base_ class), trying to access `super` or `this` before calling the base constructor with `super(...)` causes a runtime error.
Languages typically prevent those accesses because they want to enforce a guarantee that the base class constructor will have finished setting up the class instance before any derived class logic reads from the instance.

Trying to evaluate this snippet in JavaScript will result in an error:

```js
class Base {}
class Derived extends Base {
    constructor() {
        console.log(this);
        super();
    }
}

// Uncaught ReferenceError: Must call super constructor in derived
// class before accessing 'this' or returning from derived constructor
new Derived();
```

Statically determining whether a constructor is going to cause that runtime error is a nigh-impossible job.
Constructors can have immediately-called functions, loops, objects, and other runtime shenanigans that make it hard to tell whether a `super(...)` call will always be run.

This constructor does always call its base constructor, but that would be very difficult for a static type system such as TypeScript's to know:

```ts
class Base {}
class Derived extends Base {
    constructor() {
        [
            () => console.log("😈"),
            () => {
                () => {
                    console.log("😇");
                    super();
                };
            },
            () => console.log("😈"),
        ][1]();
    }
}
```

Early versions of TypeScript didn't attempt to figure out those complicated constructor cases.
They instead only made sure that in classes containing properties, the first logical line of code in a constructor was a `super(...)` call.

TypeScript's type checker would report an error on the previous snippet's `this`:

```ts
class Base {}
class Derived extends Base {
    constructor() {
        console.log(this);
        //          ~~~~
        // Error: 'super' must be called before accessing
        // 'this' in the constructor of a derived class.
        super();
    }
}
```

Containing properties is an important consideration because in the output compiled JavaScript, initial values for those properties are assigned immediately after the `super(...)` call.

This class seems to run `console.log("2️⃣")` after its `super()`:

```ts
class Base {}
class Derived extends Base {
    property = (() => {
        console.log("1️⃣");
        return this.toString();
    })();

    constructor() {
        super();
        console.log("2️⃣");
    }
}
```

...but its compiled JavaScript shows that it would log `"1️⃣"` first:

```js
class Derived extends Base {
    constructor() {
        super();
        this.property = (() => {
            console.log("1️⃣");
            return this.toString();
        })();
        console.log("2️⃣");
    }
}
```

> TypeScript's [`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig/#useDefineForClassFields) compiler option changes that output.
> Differences in class fields emit is a whole other can of worms I won't get into here.

Enforcing the first line of the constructor be the `super(...)` call was much more straightforward for TypeScript to enforce than trying to understand advanced code logic.
Unfortunately, it came at a cost: even lines of code that don't create logical blocks or reference `super` or `this` were still flagged as invalid.

This snippet was considered invalid in the type system even though all it wanted to do was `console.log` before calling `super()`:

```ts
class Base {}
class Derived extends Base {
    property = true;

    constructor() {
        console.log("🥺");
        // ~~~~~~~~~~~~~~~
        // Type error: A 'super' call must be the first statement in
        // the constructor when a class contains initialized
        // properties, parameter properties, or private identifiers.
        super();
    }
}
```

I'd previously been inconvenienced by that limitation when working in OOP-style projects in TypeScript.
This issue seemed like it'd be both a good way to challenge my understanding of TypeScript and solve a real user-issue hit by many users.

### Project Scope

There ended up being two areas of source code I had to change:

-   [Updating the Type Checker](#updating-the-type-checker): Adjusting TypeScript's type errors to be more lenient
-   [Updating Transformers](#updating-transformers): Adjusting output JavaScript for more varieties of constructors

---

## Updating the Type Checker

Most use cases for including non`-this`, non-`super` code in the constructor of a derived class are fairly small.
The ones I'd seen in the wild were generally about logging and/or creating a temporary variable to be passed as an argument to the `super(...)` call.

Thus, I thought it'd be best to tweak TypeScript's type system logic without overhauling it.
Instead of requiring the `super(...)` call be the _first_ expression in the constructor, I would make two requirements:

-   It would need to be a _root-level_ expression: meaning it couldn't be contained in a block such as an `if` or `for`
-   Runtime uses of `this` and `super` keywords would not be allowed before that root-level expression

You can see the changes in the pull request's [`src/compiler/checker.ts` file view](https://github.com/microsoft/TypeScript/pull/29374/files#diff-d9ab6589e714c71e657f601cf30ff51dfc607fc98419bf72e04f6b0fa92cc4b8).
These next two blog post sections will give a high-level overview of them.

### Checking for a Root Level `super(...)`

> [src/compiler/checker.ts#34739](https://github.com/microsoft/TypeScript/pull/29374/files#diff-d9ab6589e714c71e657f601cf30ff51dfc607fc98419bf72e04f6b0fa92cc4b8R34739)

TypeScript's type checker already found the first `super(...)` call in a constructor with a call to a `findFirstSuperCall` function:

```ts
const superCall = findFirstSuperCall(node.body!);
```

That function returns the first node that matches `isSuperCall`, skipping any function boundary and recursively searching through all other child nodes:

```ts
function findFirstSuperCall(node: Node): SuperCall | undefined {
    return isSuperCall(node)
        ? node
        : isFunctionLike(node)
        ? undefined
        : forEachChild(node, findFirstSuperCall);
}
```

I fortunately didn't need to change `findFirstSuperCall` for my changes.

I used the existing `superCall` variable for a check to make sure it was root level with a new `superCallIsRootLevelInConstructor` function:

```ts
if (!superCallIsRootLevelInConstructor(superCall, node.body!)) {
    error(
        superCall,
        Diagnostics.A_super_call_must_be_a_root_level_statement_within_a_constructor_of_a_derived_class_that_contains_initialized_properties_parameter_properties_or_private_identifiers
    );
}
```

`superCallIsRootLevelInConstructor` checks whether a `super(...)` _call expression_'s parent _expression statement_ is in the body of a constructor:

```ts
function superCallIsRootLevelInConstructor(superCall: Node, body: Block) {
    const superCallParent = walkUpParenthesizedExpressions(superCall.parent);
    return (
        isExpressionStatement(superCallParent) &&
        superCallParent.parent === body
    );
}
```

To recap TypeScript's AST behavior around call statements:

-   **Block**: Area containing lines of code, commonly surrounded by `{}`
-   **Statement**: Line of code, commonly a child of a _block_
    -   Examples include _expression statements_, _for statements_, and _if statements_
    -   **Expression Statement**: Contains a _call expression_ as its child expression
-   **Call Expression**: A call to a function

I find it easier to remember the distinction by recalling that _statements_ may optionally have a semicolon.
In codebases that include semicolons, expression statements contain a child such as a _binary expression_ or _call expression_ plus one character for a semicolon:

```plaintext
super();
|------| <- expression statement
|-----| <- call expression
```

### Checking Constructor Statement Order

> [src/compiler/checker.ts#34754](https://github.com/microsoft/TypeScript/pull/29374/files#diff-d9ab6589e714c71e657f601cf30ff51dfc607fc98419bf72e04f6b0fa92cc4b8R34754)

Next up was making sure nothing in the constructor accessed `super` or `this` before the `super(...)` call.
I did that with a for loop over the statements in the constructor.
For each statement:

1. If the statement is an expression statement that contains a `super(...)` call, mark that we found it and break the loop
2. If the statement is a "prologue directive", continue
3. If the statement "immediately" references `super` or `this`, break the loop

At the end of the loop, if we hadn't found the `super(...)` call, issue a type error for failing to find it.

#### Prologue Directives

I had never heard of this term before this pull request.
It refers to string literals used as a statements such as `"use asm;"` and `"use strict";`.
They are by nature allowed to come before any code in a constructor.

In retrospect, I don't recall why I added a special case for them to the function.
Ah well.

#### Immediately Referencing `super` or `this`

By "immediately" I mean a node accesses `super` or `this` in code that is known to execute immediately, such as children of expressions and blocks.
Another way of putting that is ignoring any code that won't be immediately executed, such as function or property declaration.
There are a lot of edge cases in there!
For example, a class `extends` clause immediately executes the base class being extended, but initial values for properties in any class aren't used in runtime until the constructor for their class is called.

```ts
class Base {}
class Derived extends Base {
    constructor() {
        // class Middle { ... } executes immediately for Inside to extend it...
        class Inside extends class Middle {
            // ...while this property is created later, per-instance
            woweeMiddle = this;
        } {
            // ...while this property is created later, per-instance
            woweeInside = this;
        }

        super();

        new Inside();
    }
}
```

I wrote a `nodeImmediatelyReferencesSuperOrThis` helper function that, similar to `findFirstSuperCall`, recursively checks children of a node.
It stops searching when it encounters a node that creates a new class scope or delays execution of its contents, such as a function or class property.

```ts
function nodeImmediatelyReferencesSuperOrThis(node: Node): boolean {
    if (
        node.kind === SyntaxKind.SuperKeyword ||
        node.kind === SyntaxKind.ThisKeyword
    ) {
        return true;
    }

    if (isThisContainerOrFunctionBlock(node)) {
        return false;
    }

    return !!forEachChild(node, nodeImmediatelyReferencesSuperOrThis);
}

/**
 * @returns Whether the node creates a new 'this' scope for its children.
 */
export function isThisContainerOrFunctionBlock(node: Node): boolean {
    switch (node.kind) {
        // Arrow functions use the same scope, but may do
        // so in a "delayed" manner
        // For example, `const getThis = () => this` may be
        // before a super() call in a derived constructor
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.PropertyDeclaration:
            return true;
        case SyntaxKind.Block:
            switch (node.parent.kind) {
                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    // Object properties can have computed names;
                    // only method-like bodies start a new scope
                    return true;
                default:
                    return false;
            }
        default:
            return false;
    }
}
```

With these approximate type checker changes, the type checker allows for code before the `super(...)` so long as it doesn't immediately reference `super` or `this`.

That leaves us with making TypeScript's code emit properly output JavaScript for these new constructor variants.

## Updating Transformers

TypeScript's code emit works by passing each input file's AST through a series of transformers.
You can see the impacted transformers in the [pull request](https://github.com/microsoft/TypeScript/pull/29374/files) under `src/transformers`.
They're coordinated by a [`getScriptTransformers` in `src/compiler/transformer.ts`](https://github.com/Microsoft/TypeScript/blob/39ff1568e9676d40cf545477e9fd04077eff9b78/src/compiler/transformer.ts#L41).

The transformers relevant to this PR are, in order:

1. `transformTypeScript`: Removes type system specific syntax, leaving pure glorious JavaScript
2. `transformClassFields`: Massages class fields such as class properties and parameter properties into their JavaScript equivalents
3. For each language version recognized by TypeScript, a transformer of the next language version's name transforms it
    - These start at ESNext, then decrease sequentially from the newest known language version down to the configured output target language version
    - For example, if the configured output language version is `es2019`, then as of TypeScript 4.6 the transformers to be run would be: `transformESNext`, `transformES2021`, and `transformES2020`

Transformers generally recursively crawl through the nodes in the file's AST, applying transformations to specific node types as they find them.
These next three blog post sections will give a high-level overview of each of the changed transformers.

### `transformTypeScript`

> [`src/compiler/transformers/ts.ts](https://github.com/microsoft/TypeScript/pull/29374/files#diff-434a48997b788187774ea0573dd60688d07638fc89e809acf9bb3f455c816027)

`transformTypeScript` includes a `transformConstructorBody` function to turn any parameter properties into assignments within the constructor.

For example, this TypeScript class:

```ts
class HasParameterProperty {
    constructor(public property: number) {
        console.log("Hello, world!");
    }
}
```

...would become this JavaScript class (or the equivalent with `Object.defineProperty` if `useDefineForClassFields` is enabled):

```ts
class HasParameterProperty {
    constructor(property) {
        this.property = property;
        console.log("Hello, world!");
    }
}
```

`transformTypeScript` previously assumed it could add both prologue directives and the initial super call all at once when transforming a constructor.
It did so with a function named `addPrologueDirectivesAndInitialSuperCall` that returned the index of the first statement after them.

I replaced that function with code that computed two important variables:

1. `indexAfterLastPrologueStatement`: After copying any prologue statements, the index of the node just after them
2. `superStatementIndex`: Index of the first found `super(...)` call after prologue statements, or `-1` if not found

Using those two variables, this is the order the code now takes to create the transformed constructor's body in the proper order:

1.  If `superStatementIndex` was found, first visit existing statements up to and including it
2.  Visit any parameter properties and map them into nodes:
    -   If `superStatementIndex` was found, place those parameter properties immediately after it
    -   If `superStatementIndex` wasn't found, place the parameter properties first in the constructor
3.  Add any remaining statements from the body, skipping the `superStatementIndex` index if it was found

### `transformClassFields`

> [`src/compiler/transformers/classFields.ts](https://github.com/microsoft/TypeScript/pull/29374/files#diff-2f470e1718434e5dfb841136a11eda3b4f46e9a2b3d14e0401c64f304da2b87e)

`transformClassFields` also contains a `transformConstructorBody` function.
This time it's used to turn class properties into assignments within the constructor.

For example, this TypeScript class:

```ts
class HasClassProperty {
    property = 1;
    constructor() {
        console.log("Hello, world!");
    }
}
```

...would become this JavaScript class (or the equivalent with `Object.defineProperty` if `useDefineForClassFields` is enabled):

```ts
class HasClassProperty {
    constructor() {
        this.property = 1;
        console.log("Hello, world!");
    }
}
```

This `transformConstructorBody` also inserts a "synthetic" `super(...arguments)` if the class is a derived one with a property initializer and without its own constructor.

For example, this TypeScript class:

```ts
class HasJustClassProperty {
    property = 1;
}
```

...needs to create its own `constructor` and `super(...arguments)` in order to hold the mapped property in its output JavaScript:

```js
class HasJustClassProperty {
    constructor() {
        super(...arguments);
        this.property = 1;
    }
}
```

In order to account for code being emitted before any class properties and any constructor, a surface-level explanation of the logic could be:

1. Map any prologue directives and explicit `super(...)` call into the new constructor
2. If there was a `super(...)` call, splice any statements preceding it after the prologue statements and before the `super(...)` call
3. Later depending on whether a `super(...)` call was found:
    - If it was, add parameter properties immediately after it
    - If it wasn't but a synthetic `super(...arguments)` was added, add those parameter properties just after it
    - If neither is the case, add those parameter properties to the top of the constructor

Ordering is tricky!

I also excluded parameter properties from being moved into the constructor when `useDefineForClassFields` is enabled, as those properties are then handled elsewhere.
I don't remember where else they're handled but I do remember that when I didn't filter them out, they appeared twice in the output JavaScript.

### `transformES2015`

...you can do it, Josh! 😩

## Final Thanks

I'd like to extend a sincere heartfelt thanks to the several developers who reviewed the pull request over the years:

-   [Klaus Meinhardt (ajafff)](https://github.com/ajafff): An all-around knowledgeable developer who has previously created a linter ([fimbullinter/wotan](https://github.com/fimbullinter/wotan)), helped maintain TSLint, and gave helpful pointers early in the pull request -- all as a fellow external contributor.
-   [Wesley Wigham (@weswigham)](https://twitter.com/WesleyWigham): For giving the pull request a helpful review and its first approval back in 2020.
-   [Ron Buckton (@rbuckton)](https://twitter.com/rbuckton): For an intensely thorough set of reviews containing deep insights into the wild and wacky world of JavaScript and TypeScript classes, along with the final approval in 2022.

Additional thanks to [Daniel Rosenwasser (@drosenwasser)](https://twitter.com/drosenwasser) for helping me coordinate the cake.
Hopefully if there's a next time I'll be able to hand-deliver it to the TypeScript team office in Redmond rather than hoard it all for myself in Brooklyn.
