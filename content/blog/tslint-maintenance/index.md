---
title: "Thoughts as a TSLint Maintainer"
date: "2019-11-18T12:34:56.117Z"
description: "Now that TSLint is being deprecated, let's look at the history of JavaScript and TypeScript linting."
---

> Howdy!
> This blog post is a personal reflection on my experiences working with TSLint.
> If you're curious about the backing historical context, go back to [TSLint to ESLint Part 1: Historical Context](../tslint-to-eslint-history).
> If you just want to understand how [tslint-to-eslint-config](https://github.com/typescript-eslint/tslint-to-eslint-config) migrates configurations from TSLint to ESLint with [@typescript-eslint](https://typescript-eslint.io), skip to [TSLint to ESLint Part 2: tslint-to-eslint-config](../tslint-to-eslint-config).

I joined the TSLint maintenance team in November 2018, at the peak of its disrepair.
My first goal was to sludge through the hundreds of unaddressed or stale issues and pull requests.

### But Why Bother In The First Place?

Back in 2018 it wasn't clear _(at least to me)_ what was going on with typescript-eslint.
I wasn't sure it would achieve feature parity with TSLint's typed rules in a performant manner to run with ESLint.

_Now_ it's obvious I was wrong.
I was very wrong.
I was incredibly, obviously, plainly wrong.

_Of course_ we would be able to bring the full TypeScript type checker to ESLint.
_Of course_ the TypeScript team would choose to support the open source project already commonplace in the rest of the JavaScript ecosystem.
_Of course_ the relevant maintainer teams would be able to resolve the [assorted](https://github.com/typescript-eslint/typescript-eslint/issues/1132) [structural](https://github.com/typescript-eslint/typescript-eslint/issues/1126) [performance](https://github.com/typescript-eslint/typescript-eslint/issues/1079) **[issues](https://github.com/typescript-eslint/typescript-eslint/issues/1040)**.

> Linking to those issues is not snark or passive-aggressiveness -- it's a celebration of the incredible work done by the TypeScript and typescript-eslint teams in molding together multiple fundamentally different systems.
> We all owe them a _massive_ debt of gratitude for their work to solidify our linting practices.

But, still, in 2018 the commonly accepted way to lint TypeScript code using rules that had access to the type checker was with TSLint.

Which had 20 pages of untriaged issues and 70 pull requests left open.

Which was still recommended by many as "the" TypeScript linter despite having an objectively inferior architecture to the relatively obscure [fimbullinter/wotan](https://github.com/fimbullinter/wotan).

Which was a project I'd used to great effect in my personal and work projects -- that I could see had incredible potential for improving developers' TypeScript code.

### What Is and What Should Never Be

My longer-term goal after joining TSLint would have been to move it towards a community management team.
That would have helped buffer TSLint from fluctuating attention on the Palantir side _(though I'm sure the developers there would have continued to play a big part in contributing!)_, and helped bring in the developer power to catch up to ESLint.

We'll never know what that would have been like now.
TypeScript [announced its switch of focus to ESLint](https://github.com/microsoft/TypeScript/issues/29288) a couple of months after I started on TSLint.
As I said to them: as exciting as it was to take on maintaining TSLint, it was _even more exciting_ to see the plans to switch to ESLint.

### Was It Worth It?

_**Yeah!**_
_Of course!_

I wanted to step up and [make the _(linting)_ world a better place](https://www.youtube.com/watch?v=fRUAJVKlUZQ).
I think I objectively did.
_We_ did -- through plenty of people, including other maintainers\* and [hundreds of contributors](https://github.com/palantir/tslint/graphs/contributors).

We helped keep a lot of TypeScript projects linted until typescript-eslint was standardized.
Mathematically, if thousands upon thousands of projects were using TSLint, and TSLint was able to catch issues ESLint was not, we must have prevented thousands upon thousands of bugs.
That's got to be worth something positive, right?

\* _(shoutout to [Adi Dahiya](https://github.com/adidahiya) for supporting me as a junior maintainer!)_

### Being a Maintainer Rocks

TSLint was the third community-visible open source project used and contributed to by others I was truly a 'maintainer' on _(my own, now-DMCAd [FullScreenMario](https://github.com/JoshuaKGoldberg/Old-Deleted-FullScreenMario) doesn't quite count)_.
My first two were [TSLint.MSBuild](https://github.com/JoshuaKGoldberg/TSLint.MSBuild) and [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib).
You could say that TSLint was and is the backbone of my nascent open source maintenance experience.
Helping steer these projects is a fantastic learning experience and a wonderful way to give back to the community -- even with all the turmoil and shenanigans.
I'm eternally grateful to the folks in and out of TSLint's maintenance team for giving me the chance to work on TSLint.

I would highly recommend doing maintenance work in open source if you ever get the chance.
At the very least, it helped teach me:

* How to document long-term architectural decisions and goals when project ownership isn't clear...
* How to file clear, understandable issues for newcomers with little-to-no project context...
* The importance of lowering barriers to entry for contribution: e.g. autoformatters, tests-as-documentation, and getting started guides...
* The true, incredible power of requiring filled-out issue and pull request templates...

...and most importantly, that open source management is a two-way exchange.
Managing a project needs empathy and understanding from both ends.
Maintainers need to understand how users use the project, so they can set up new users for success and empathetically respond to issues and pull requests.
Users need to understand the reasons behind maintainer decisions so they can work with the system as they're improving it.

Ideally, maintainers have a responsibility to set up processes to allow these streams of information to flow freely and share information as necessary.
Ideally, users should work within those streams to contribute meaningfully.
Ideally, everybody plays nice and understands both sides want what's best for the project and its users.

### Being a Maintainer Sucks

Yet, open source software is built over the internet.
Do you know what type of people inhabit the internet?

!["Assholes, assholes everywhere" captioned meme of Buzz and Woody from Toy Story](./assholes-everywhere.png)

<em style="display:block;margin-bottom:2rem;text-align:center;">
This meme usage is inaccurate: it's really that people have the best intentions, but when viewed through the limited lens of the internet, everyone <strong>seems</strong> like an asshole...
</em>

I'll admit I made mistakes and was the "asshole" plenty of times throughout my maintenance tenure:

* I [merged a PR that duplicated another person's work](https://github.com/palantir/tslint/pull/3992#issuecomment-436633059)...
* I got into debates [without explaining my context](https://github.com/palantir/tslint/issues/975#issuecomment-435640297) or [over unnecessary esoteric features](https://github.com/palantir/tslint/issues/1306)...
* I [closed issues prematurely](https://github.com/palantir/tslint/issues/1489#issuecomment-460655323)...
* I [added rules and features without documenting them well](https://github.com/palantir/tslint/issues/4117), causing headaches for beginner and advanced users...
* I [indicated a big refactor would be accepted]() even though we didn't have the maintenance staffing to support it...

Taking on maintenance for a project _(hopefully)_ means you care about where it goes: you want it and its users to be made more productive by the time you spend on it.
I took on a real emotional weight by committing to spending personal time on TSLint.
We can talk all we want about work/life balance and how volunteer work should be a pleasant experience and how open source should be a golden utopia of working towards common goals... but at the end of the day, many projects are free labor provided out of some feeling of commitment and goodwill.

All this is to say: spending time maintaining a project can truly open you up, emotionally, to an inevitable cesspool of internet rage.
Single 
You start to feel responsible for every little _"why isn't this working?"_ or _"please, this feature is necessary!"_ or -the worst of them all- _"why isn't this done yet?"_.
Issues pile up when you take a break.
Eventually every spare moment you acquire is a choice between improving the lives of these internet users and improving your own.
Maintenance is a goddamn burden if you let it be.

One insidious change I noticed in myself was a growing disregard for the plight of users.
Issues meant more work for me - why would I _want_ more of them?
My initial enthusiasm for the project matured into a sense of duty... which eventually soured into a reluctant sludgy reluctance to do more than the bare minimum of contribution work.
My issue responses accordingly went from encouraging, supportive paragraphs of prose in late 2018 to curt MVPs in mid-2019.

> If you haven't yet, read Henry Zhu's [Open Source of Anxiety](https://increment.com/open-source/open-source-of-anxiety) post.
> I only experienced a small share of maintenance burden; maintainers of massive projects such as Babel have _much_ more to deal with.

Again, if you have the chance to maintain a project, I'd highly recommend you do it.
But don't go overboard -- don't let it be a significant portion of your life unless you're ready to manage your own emotional labor.

Eventually I'd like to take on more responsibilities in the community again.
But it'll be a while before I'm ready.
