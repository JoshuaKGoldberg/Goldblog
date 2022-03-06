---
date: "2022-03-07T12:34:56.117Z"
description: "Those costs run both ways. Open source contributors and maintainers alike have to balance their finite energy and time resources within many constraints."
title: "Why Open Source Pull Requests Can Take A While"
---

Open source software is wonderful.
You can collaborate on the latest and greatest in developer technology with bright minds across the world.

But, there are costs to participating in open source software:

-   **Contextualization**: You must familiarize yourself with a project's technologies to participate in it
-   **Coordination**: There is some overhead to working with tooling such as Git, GitHub, package registries, and so on
-   **Development Energy**: For many, there's only so much time per day and/or week we can stand coding
-   **Social Energy**: For many, communicating with strangers takes from the finite amount we can stand talking to other humans
-   **Time**: There are only so many hours in the day that we can expend on open source software

Those costs run both ways.
Open source contributors and maintainers alike have to balance their finite energy and time resources within those constraints.
Open source repositories are software projects like any other: they have deliverables, a set of team priorities, and a finite list of resources to work with.

I don't want to discourage anybody from participating in open source --really, it's fantastic; I highly recommend it!-- but do want to surface why open source pull requests can take a while.
This blog post is an overview of many of the common factors that go into an open source pull request taking weeks, months, or more to be merged.
I think this information is useful to help developers understand how open source reviews week.
It's also a useful reference alongside this deep dive for an open source pull request I sent that took three years to merge: [TypeScript Contribution Diary: Allowing Code in Constructors Before `super()`](https://blog.joshuakgoldberg.com/code-before-super).

## Most Pull Requests Are Nontrivial

Pull requests that exclusively change a comment or document typo are generally quick and straightforward to both author and review.

Most pull requests, though, touch more than just one word.
They involve some kind of runtime logic change and hopefully include a corresponding test change as well.

Creating one of these logic-touching pull requests involves a nontrivial amount of work for a contributor:

-   Identifying an issue from the issue tracker that matches their technical interest and level of expertise
-   Understanding any nuances associated with the issue and potential solutions
-   Creating the pull request's changes to code, documentation, and tests
-   Describing the pull request

The maintainer's side has its own complexities too:

-   Understanding the issue again and confirming it's still valid
-   Reading through and understanding the pull request's changes (this could become their code to maintain, after all!
-   Confirming the changes match their short- and long-term vision for the project
-   Describe any change requests in a polite and supportive manner

## Large Pull Requests Are Especially Difficult

All those difficulties are amplified when a pull request involves many changes and/or is in a particularly tricky area to work with.
Larger pull requests such as mine cause an unusually high amount of work for both contributors and maintainers to coordinate around, review, QA in beta, and so on.

Open source reviews are by nature often asynchronous: often days, weeks, or even larger stretches of time can pass between reviews.
That means both sides of the review may have to ramp themselves back into having context on the pull request.
That can be a nontrivial amount of time ranging from minutes to hours each time a side needs to review.

For larger open source projects, more code a pull request touches, the more likely it is to touch an area relatively fewer maintainers have deep expertise on.
Repeatedly coordinating an expert to look at an external contributor's large, tricky pull request is a tough ask.
They're likely already in high demand for other maintenance tasks and might have less time to spare.

## Final Thoughts

A pull request staying open a long time is unfortunate but is bound to happen from time to time.
It's important to understand why that's the case and to maintain empathy for both sides of the review through the process.

Many thanks to [Daniel Rosenwasser](https://twitter.com/drosenwasser) discussing the reviewer's side of larger pull requests in the context of [TypeScript Contribution Diary: Allowing Code in Constructors Before `super()`](https://blog.joshuakgoldberg.com).
