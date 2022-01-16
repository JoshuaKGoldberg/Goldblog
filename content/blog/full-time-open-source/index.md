---
title: "Full Time Open Source"
date: "2022-01-21T12:34:56.117Z"
description: "I'm quitting my job to become a full time open source maintainer"
---

I love coding.
It's what gets me onto the computer most days of the week and keeps me doing side projects.

I also love open source software.
I love how a worldwide community of coders is constantly pushing forward the latest and greatest in technology.

Although I've enjoyed being a full-time software developer for seven years or so, I'm tired of doing it 40 hours of week for a company.
Working with other developers for hours a day is great -collaborating, learning, and mentoring- but it's draining even when there's not a global pandemic.
All my favorite projects through my career have been things that directly benefit other developers and/or substantially involve open source contributions.

That's why **I'm quitting my job to become a full time open source maintainer**.

My last day at Codecademy will be January 28th, 2022.
I'm taking February partially off to relax, then fully starting in March I'll be dedicating work time to contributing to open source software projects.

> TODO: "SO LONG" GIPHY

## What is Open Source Software (OSS)?

Software whose source code anybody can see.
Commonly associated with free open source software (FOSS), and a superset of projects anybody can contribute to.

The vast majority of software today is built primarily on free open source software, including most popular programming languages languages (Go, Ruby, TypeScript, ...) and platforms (Next.js, Rails, ...).
The Codecademy blog has a great article on it: [Understanding open source software: A Q&A](https://www.codecademy.com/resources/blog/what-is-open-source).
I'd also highly recommend _Working in Public_ by [Nadia Eghbal](https://nadia.xyz) for a deeper dive on its history, importance, and many of the problems it faces today.

## What is an Open Source Maintainer?

Someone who helps run an open source project.

Sometimes that's as small as the sole developer on a project who writes and releases all the code on their own.
They might review filed requests (often in the form of GitHub issues) and submitted code contributions ("pull requests") from other developers who happen to use the project.

Other times that's on a bigger project with multiple other maintainers

## Why Be an Open Source Maintainer?

### Because it's fun

That's my primary motivation.
My dream since I've learned to code was to spend my days working on interesting projects and growing myself as a developer.
I'm doing this because I want to and I've accumulated enough financial stability -seven years of overpaid tech work and a spouse with great medical insurance- to not worry about not making any money pursuing my passion.

### Because it's good for me

Working in open source software has been one of the single biggest accelerators of my career.
It's given me exposure to people and technology I never would have come into contact with.
I've gotten to collaborate with some of the best people in the industry on some of the coolest projects.
And it's great for my social media presence.

### Because it's good for everyone

Part of what makes open source work so fun is that it improves the developer experience for people around the world.
When I improve an error message to TypeScript, TypeScript beginners everywhere have a bit less bad of a time deciphering its complaints.
When I write an ESLint rule _(shoutout to my favorite, [`no-floating-promises`](https://typescript-eslint.io/rules/no-floating-promises)!)_ that catches classifications of bugs, it's like I'm pointing out issues to developers worldwide.
I love it!

### Because the software world will keep breaking until we fix open source

Remember [Log4Shell](https://en.wikipedia.org/wiki/Log4Shell)?
[Color & Faker's liberty commits](https://gizmodo.com/an-open-source-developer-just-caused-a-whole-lot-of-cha-1848331944)?
The [xkcd Dependency comic](https://xkcd.com/2347)?

The way we fund open source software today is partially broken.
Maintainers sign on for fun, for glory, and/or out of good intentions, then find themselves overwhelmed with demanding users.
Most of us don't make any direct income from the experience, and out of those who do, it's mostly small donations on the scale of $5-10/month.
Ludicrous!

I want to jump into this wacky world of open source and make a better, more equitable system for maintainers and their projects.
I don't know yet what that would look like -standardized company sponsorship pledges? public sponsorship funds? radical distribution model rewrites?- but _something_ needs to get done.

## Expected Projects

I plan on working on a mix of projects that are useful to others and/or fun for me.

### Static Analysis

My core most valuable open source contributions have mostly been around web static analysis -- the art of scrutinizing code for information or potential issues without running it.
These projects are the ones I'm hoping to focus on:

-   [**TypeScript**](https://typescriptlang.org): Contributing any way I can. You can see more under _"TypeScript Contribution Diary"_ posts on [my blog](https://blog.joshuakgoldberg.com).
-   [**TypeScript ESLint**](https://typescript-eslint.io): Monorepo for all the tooling which enables ESLint to support TypeScript. I joined on as a maintainer recently.
-   [**TypeStat**](https://github.com/JoshuaKGoldberg/TypeStat): Converts JavaScript to TypeScript and TypeScript to better TypeScript. Once I nail down common bugs and crashes I think this is going to be a great engine.
-   [**eslint-plugin-expect-type**](https://github.com/JoshuaKGoldberg/eslint-plugin-expect-type): ESLint plugin with $ExpectType, $ExpectError, and $ExpectTypeSnapshot type assertions. I'd love to make the story of testing Typescript types _good_ in 2022.

### Side Projects

These projects I do because I think they're fascinating and/or fun, if not particularly useful:

-   [**EightBittr**](https://github.com/FullScreenShenanigans/EightBittr): Bare-bones, highly modular game engine for 2D 8-bit games. I want to finally make it performant and have a good level editor & random map generation support as first party modules.
-   [**Budgie**](https://github.com/budgielang/budgie): A unified syntax that compiles into your favorite OOP languages. I want to finish writing it in itself ("dogfooding"), then make a really great docs site to show it off.
-   [**Emojisplosion**](https://github.com/JoshuaKGoldberg/emojisplosion): 💥Blasts 😄emoji😊 like 🎆fireworks🎇 all up in your 💻HTML 📄page. 😚😍. A cute little project I want to add more demos on, update for the latest emoji specs, and create more integrations around such as the also-very-cute [Konamimojisplosion](https://github.com/Codecademy/konamimojisplosion).

## Expected Funding

I've set up [my GitHub Sponsors page](https://github.com/sponsors/JoshuaKGoldberg) with suggested sponsor tiers for individuals and companies.
If you want to sponsor me I'd greatly appreciate it. 💝

My first company-based sponsorship starting in March will be $4000/month from Codecademy (10 hours a week, $100/hour) to work on open source projects its frontend teams use.
That's a excellent gig and I'm tremendously grateful to have it.
You can track the projects we're working on in my [Codecademy Consulting Notion doc](https://www.notion.so/Codecademy-Consulting-919960606f1f40788c97aab6c4326c35).

I'm also writing an [O'Reilly _Learning TypeScript_ book](https://www.oreilly.com/library/view/learning-typescript/9781098110321) set to publish the middle of this year and working with O'Reilly on more TypeScript content.

## FAQs

### Why Fund Me?

In general, sponsoring me to work on open source will keep me advancing the tooling for web developers worldwide. 🌐

You can see the specific tiers on [my GitHub sponsors page](https://github.com/sponsors/joshuakgoldberg), such as supporting your company or project in using web tooling.

### Is this related to Skillsoft acquiring Codecademy?

Nope.
I told my managers I was thinking of quitting in early 2021, then made it official at the start of December 2021.
I didn't learn about the acquisition for another few weeks.
Awkward timing.

### Do you have serious drama with Codecademy?

...if I did, I wouldn't continue to work with them! 😉

Codecademy's engineering department was -and still is- a wonderful place to work.
I'm still recommending people apply to join my old team, Web Platform.
Let me know if you're interested!
