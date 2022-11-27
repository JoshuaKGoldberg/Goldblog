---
date: "2022-12-05T01:23:45.117Z"
description: "Charting a typical developer's emotional journey through learning TypeScript's type system."
image: the-typescript-type-cycle.png
title: "The TypeScript Type Cycle"
---

The [Gartner Hype Cycle](https://wikipedia.org/wiki/Gartner%20Hype%20Cycle) is an industry phenomenon theorized to occur with most new technologies.
It describes how new (technologies?) tend to go through three public vibes, in order:

1. **Peak of Inflated Expectations**: The technology is the latest new hotness and everybody loves using it for everything
2. **Trough of Disillusionment**: Users discover its flaws the hard way - especially when using it in areas it's not optimal for
3. **Plateau of Productivity**: The community settles on optimal ways to use the technology

Anecdotally, I've seen this happen plenty of times.
TypeScript -and its type system in particular- are no exception to the Gartner Hype Cycle.
Most users who learn TypeScript go through a reminiscent cycle of their own:

1. **Peak of Inflated Types**: Using far too many fancy TypeScript type system features
2. **Trough of Type Disillusionment**: Struggling with those very same type system features
3. **Plateau of Productive Types**: Learning to reign in usage of those types, only using them when necessary

I've affectionately called this the **TypeScript Type Cycle**.

!["TypeScript Type Cycle": Single line chart from left to right with a peak at "Peak of Inflated Types 🤩", a trough at "Trough of Type Disillusionment 😩", and a leveling out at "Plateau of .](./the-typescript-type-cycle.png)

<em style="display:block;margin-bottom:2rem;text-align:center;">
A visualization of the TypeScript Type Cycle.
<br />
</em>

## Peak of Inflated Types 🤩

TypeScript's type system is a beauty to behold.
Once you understand conditional types, generics, and mapped types, it's a ton of fun to play around with.

Many developers go overboard with those type system features upon first understanding them.
Take a look at the types that enable the following `exclaim` function's return type to be more specific if the type of `data.happy` is known:

```ts
// This code snippet is intentionally convoluted. Please don't copy it!

interface MessageData<M extends string> {
    happy: boolean;
    message: M;
}

type HappyMessage<M extends string> = `Happy ${M}!`;

type UnhappyMessage<M extends string> = `Unhappy ${M}...`;

type ExclaimedMessage<MD extends MessageData<string>> = MD["happy"] extends true
    ? HappyMessage<MD["message"]>
    : MD["happy"] extends false
    ? UnhappyMessage<MD["message"]>
    : HappyMessage<MD["message"]> | UnhappyMessage<MD["message"]>;

function exclaim<MD extends MessageData<string>>(data: MD) {
    return (
        data.happy ? `Happy ${data.message}!` : `Unhappy ${data.message}...`
    ) as ExclaimedMessage<MD>;
}

// Type: "Happy apple!"
exclaim({ happy: true, message: "apple" } as const);

// Type: "Unhappy banana..."
exclaim({ happy: false, message: "banana" } as const);

// Type: "Happy cherry!" | "Unhappy cherry..."
exclaim({ happy: Math.random() > 0.5, message: "cherry" } as const);
```

This is some cool stuff!
The `exclaim` types may seem wild and wacky -especially if you're not familiar with those fancier type system features- but they enable great precision in describing expected function returns and object shapes in code.

> Baffled by that code snippet?
> You're not alone.
> I cover the features it uses in [_Learning TypeScript_](https://www.learningtypescript.com)'s **Chapter 15: Type Operations**.

## Trough of Type Disillusionment 😩

Those wild and wacky types come at a cost.
They’re harder to write, harder to read, and much harder to debug.
The joy first felt when writing complex types descends into despair when needing to work with the wild and wacky.

Developers are especially prone to falling into the Trough of Type Disillusionment when they have to maintain those types over time.
It often turns out many of the generics and conditional types they used during the Peak of Inflated Types were unnecessary and over-inflated code complexity.
Consider this correct and wise quote on writing and then debugging complex code:

> "Debugging is twice as hard as writing the code in the first place.
> Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
>
> _—Brian Kernighan_

If you're struggling to understand generics and write code at the limit of your comprehension, you're almost guaranteeing you're going to have a bad experience the next time you modify that code.

I think complex TypeScript features are particularly prone to perplexing programmers for a few reasons:

-   Their syntax is different from what we normally code in, and therefore
-   Developers typically only use them rarely, so information can be quickly forgotten
-   There is no common tooling for debugging through type system types _(yet!)_

Don't despair though!
Many TypeScript developers have waded through the trough of type disillusionment.
Keep banging your head against those generics, and eventually you'll reach the...

## Plateau of Productive Types 😊

Generic types eventually click for most TypeScript developers who keep trying to use them.
They're a coding system like any other: they have defined rules, they have best -and worst- practices, and there are known types of situations where it is or is not a good idea to use them.

Developers who truly master the TypeScript type system generally come to the following correct conclusions:

-   Most complex uses of TypeScript generic types are unnecessary and should be removed
    -   Libraries such as ORMs that provide generic operations can use complex generics, but only to save users from having to
-   When you do need to use multiple generic type parameters, use explicit and clear names for each of them

In other words, don't be clever with your types.
Be as _readable_ and _simple_ as possible.

For example, the `exclaim` snippet from before can most likely be rewritten to remove the conditional return type:

```ts
interface MessageData {
    happy: boolean;
    message: string;
}

function exclaim(data: MessageData) {
    return data.happy
        ? `It's happy! ${data.message}`
        : `Not so happy: ${data.message}`;
}
```

Look at that!
The same runtime code, but with a fraction of the TypeScript types around it.
Much more readable.

If the code is in a situation where the `ExclaimedMessage` type does need to be generic, it should use clear names like `Message` and `MessageData` instead of acronyms like `M` and `MD`.

```ts
type ExclaimedMessage<
    Message extends string,
    MessageData extends MessageData<Message>
> = MessageData["happy"] extends true
    ? ExclaimedHappy<Message>
    : MessageData["happy"] extends false
    ? ExclaimedUnhappy<Message>
    : ExclaimedUnhappy<Message> | ExclaimedHappy<Message>;
```

### Tips for Improving your Generics

-   Readers should ideally be able to understand what a type does by reading its name and type parameters.
-   Don't violate the [Golden Rule of Generics](https://effectivetypescript.com/2020/08/12/generics-golden-rule): _If a type parameter only appears in one location, strongly reconsider
    if you actually need it._
-   Don't make anything generic until at least two or three consumers of it have demonstrated a real benefit to doing so.

## Further Reading

I ideated this concept while working on my Adventures in _Type Safe Prisma Clients_ talk at Prisma Day 2022 [slides](https://1drv.ms/p/s!AvUc1cvPrJnWvtQLoqKbcgSfwfAZYw?e=fR6JqZ "Prisma Day 2022 slides")] [[video](https://www.youtube.com/watch?v=uFj4qsyGvH0&ab_channel=Prisma "Prisma Day 2022 video)]
