---
date: "2023-04-25T01:23:45.117Z"
description: "Why web app frameworks that assume availability of an online server likely are not a future-forward approach."
image: TODO.jpg
title: "HTML-Over-The-Wire Needs Client Logic Too"
---

> ⛔️ **This is a draft blog post and might be completely wrong.** ⛔️
>
> I have yet to talk to anybody who uses frameworks such as Hotwired.
> Please do not treat the following content as verified facts or informed opinions!

Today's web application frameworks generally fall into one of three categories based onwhere runtime logic may be executed:

1. **Client-only**: runtime logic may _only_ occur on the client
    - _Example: traditional React Single Page Apps, or SPAs_
2. **Hybrid**: runtime logic may occur on _both_ or _either_ of the client or server
    - _Example: newer React frameworks such as [Next.js](https://nextjs.org) and [Remix](https://remix.run)_
3. **Server-only**: runtime logic may _only_ occur on the server
    - _Example: [Hotwired](https://hotwired.dev)_

My concern is with **server-only frameworks**: those that require user event handling and other client logic be handled _exclusively on the server_.
Because while the server may be a faster and more reliable machine than the client, **clients aren't guaranteed to have internet connectivity**.
And if the user takes an action without the ability to ask the server for a response, their experience will suffer.

## All User Actions Are Important

Have you ever clicked a button on an app or website and seen nothing happen as a result?
It's universally infuriating.
Now imagine if your entire application was at risk of this same mishap whenever the client goes offline.

### Going Offline Is Common

In this day and age, it can seem like fast internet access is available everywhere to everyone.
That's a misconception.
Users in the real world are very frequently without reliable internet access:

-   Short-term outages (e.g. ISP flickers and local thunderstorms)
-   Long-term limited connectivity (e.g. areas with pay-per-data-usage connectivity)
-   Long-term slow connectivity (e.g. areas with slow internet)

Granted, some applications may happily assume their users will never go offline.
Intranet admin controls inside a data center are probably safe.

But if we're working on framework architectures for the future of the web, we need to make sure the architectures support all reasonable uses of the web.
General-purpose apps like, say, _an email client_ should progressively enhance with users' web connectivity.

### Imperfect Remediation: Offline Indicator

Some apps are able to provide an explicit text indicator that the user is offline.
That's a good idea - users might not know that their connection is down.
Nobody should be surprised that clicking a button might not do anything.

But, as a general rule, if a piece of your UI isn't necessary for users to interact with, you have to assume some users will ignore it.
Offline indications such as banners are a stopgap solution at best.

-   Many users don't read banners or similar UI elements.
    -   Intrusive banners are annoying and train users to ignore all banners.
    -   Non-intrusive banners can be missed until it's too late.
-   It can be unclear whether the user's connection is down or just slow.
-   There is no way to make these banners both non-intrusive and timely for [`aria-live`-dependent screenreader users](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).
    -   Using `aria-live="assertive"` is annoying, especially if the app is switching between network connectivity states.
    -   Using `aria-live="polite"` means users quickly working with the page may miss the network connectivity notice appearing.

Even if an offline banner works perfectly, it's not as good a user experience as an app that can fully or even partially work offline.
Let's take writing an email from email client as an example.
Wouldn't you want users to be able to format text -bold, italic, etc.- as they write it?
Users compose plenty of emails from my laptop on a plane, and you bet we want to preview how those messages look without a network connection.

### Imperfect Remediation: Client-Only Interactivity

At this point I hope you're convinced at least that we should have some minimal client interactivity to handle offline states.
So even though the vast majority of your application logic is coded on the server in one paradigm, you inevitably will need to write some client-only scripts.
Which brings up two major design problems:

-   How do you support the inevitable complex interdependence between client-only and server-only logic?
-   Given that inevitable interdependence, why write client and server logic in such different paradigms?

Let's take sending an email from email client as an example.
Suppose you click _send_ and the app goes offline while the response is pending.
Common designs to make that experience pleasant for users include:

-   Listing pending emails in a separate area of the page
-   Moving the email to a _"Pending"_ folder or similar
-   Retrying the email send on an exponential decay (after 2 seconds, then 4, then 8, etc.)

...all of which modify the page state in some way.
Which means the client-only interactivity needs to seamlessly be integrated or overriden by the server's state changes.
That's a complex problem and not something you'd want to have to implement in your code or in a shared library.

The best case scenario I can think of for handling those states would be the server preemptively shipping code designated as client-only.
Which would turn the application framework into a hybrid framework - thereby exempting it from this article's criticisms!
Excellent.

## Generalization Is Inevitable

The flaws in server-only frameworks mentioned in this article might not apply to your specific application needs.
But that's not the point: any deeply flawed framework can work perfectly for use cases that don't happen to hit its flaws.
My point is that general-purpose web application architectures need to be flexible enough to handle all reasonable general purposes of web applications.

Server-only frameworks are too deeply flawed to be used for a large swathe of applications.
Too many use cases -really, any application that exposes a CRUD interface or user-to-user messaging- rely on having at least a little logic available to run on offline clients.
Therefore, I don't believe pure server-only frameworks should be a style of architecture we should invest in over the next decade.

Instead, I believe hybrid solutions such as [Astro](https://astro.build) and [React Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components) are much more viable options for the future of web application frameworks.
Hybrid solutions at the very least allow developers to develop logic tailored to where it can run best, be that on the client and/or on the server.
I'm excited to see where those hybrid frameworks take us over the next few years!
