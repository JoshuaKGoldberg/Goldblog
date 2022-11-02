---
date: "2022-11-04T01:23:45.1: 17Z"
description: "Lessons learned from refactors and rearchitectures on how to (not) manage software teams."
image: todo.jpg
title: "22 Lessons From Project Failures"
---

Why do experienced developers developers still make big mistakes?

I've been professionally involved with a few dozen software projects across a few dozen teams by now.
All of these projects were crewed largely or entirely by professional software developers - most of them including developers with years, sometimes even decades, of experience.
Yet most of these projects suffered from at least one annoyingly obvious mishap: delays, release-blocking bugs, professional conflicts...
How does that keep happening?

I'm going to walk you through five situations I've been in professionally.
The narrative I'll present to you is an aggregated, anonymized, and obfuscated conglomeration.
Every mistake made and lesson learned you'll hear from me actually happened with professional developers in real life.
Give or take.

TODO talk screenshot or similar

## Five Whys

The methodology I'm going to use to walk through those situations is called _“Five Whys”_.
It was originally developed by Sakichi Toyoda and popularized by Toyota manufacturing.

The crux of Five Whys is to keep asking _“Why?”_ when given a problem: arbitrarily, through at least around five levels of questioning.
Continuously asking “why?” is a helpful technique for getting to the root cause of issues.

I personally tend to phrase questions as _"How?"_ as an alternative to why.
One of Five Why's great strengths as a framework for setting up systems to prevent repeat mistakes.

You might already be using Five Whys in service outage post-mortems or retrospectives to understand why systems failed.
If so, great!
Five Whys is fantastic for those.

But I haven't seen Five Whys used as frequently in industry to diagnose team- or organization-wide issues.
And that's where I think it really shines.
There is virtually always a deeper reason underlying problems experience by groups.

## Situation 1: Buggy Release

Our first situation is from my joining a team that was about to release a major refactor to its core product.
I was incredibly excited - this was my first major software project, and I was in _awe_ of the incredible designers, developers, and PMs around me.

So you can imagine my dismay when the refactor was immediately rolled back for having a disastrous number of bugs.

Why was the release so buggy?

### Lesson 1.1: Test

First why: let’s say the app didn’t launch with tests.
Which is a big lesson everybody should learn: test your code!
It is not reasonable to add or refactor a non-trivial code area without coverage by tests.
Edge case bugs and major regressions will always creep in if you don’t add automation to prevent them.

Lesson learned: test your code?

But again, these are seasoned developers!
Surely somebody had heard of testing before and could have brought it up?

Second why: why didn’t the team write tests?

### Lesson 1.2: Test Before Release

Turns out the team was aware of tests – and had even written a spattering of unit tests before the release!
But writing integration or end-to-end tests had been listed as a time-expensive task, and so punted until after release.
The team decided to perform only high-level manual verification of the impacted flows before releasing to users.

Lesson learned: manual verification is not an adequate testing strategy for non-trivial changes.
Manually verifying changes is certainly a good idea (I hope you try out any product changes before shipping them to users!) but a comprehensive test suite verifying area of code is a much more thorough testing strategy.

Again, though, these developers should have known better.
And in the team retrospective, or retro for short, several of them did express angst over the team not writing tests before release.

Third why: why didn’t the team schedule writing thorough tests before releasing to users?

### Lesson 1.3: Don't Punt P0s

Turns out the team did file tickets for writing the tests, but they were rescheduled till after release in the interest of shipping sooner.
Someone on the team was too excited about releasing to users and pressed the big button just a bit too soon.

Lesson learned: know what tasks are “p0”, or “priority zero: must get done before release”, and don’t reschedule them for after release.

Fourth why: why didn't this get done on the team?
Or: How do we stop overeager teams from punting p0s?

### Lesson 1.4: Release Checklists

I’m a big fan of making checklists, or tasks lists: sets of steps you must check off before moving on to the next phase of a task. They’re often used in industries such as aviation and health, where missing a step can cause death or dismemberment. They’re also quite useful for developers!

For teams that ship products to users, I highly recommend setting up a checklist containing at least the following:

1. Writing end-to-end tests
1. Running a bug bash as a team
1. Accessibility testing from an accessibility tester
1. Fixing P0s from the bug bash and accessibility tests

> For more details, I also recommend [_The Checklist Manifesto_](https://wikipedia.org/wiki/The%20Checklist%20Manifesto) by Atul Gawande.
> It’s a great read on how to use checklists in various professional settings.

## Situation 2: Bus Person

For our next big project, we learned from our mistakes. We grew as a team. We included a developer very excited about and proficient in testing: in fact, the most test-capable team member. And we gave them complete freedom in setting up as much testing as they wanted!

Thus we arrive at the second bad situation: a “bus person”. The phrase “bus person” refers to the idea of “bus factor”: how many people on your project would need to be hit by a bus (or otherwise incapacitated) for you to lose key information.

In this case, our test enthusiast actually was hit by a bus and taken out of commission for two months. Ouch...

…and even worse than their great emotional and physical trauma, our application temporarily lost its expertise in end-to-end testing! Double ouch!

Why was our expertise concentrated in one person?

### Lesson 2.1: Include Knowledge Sharing Time

Letting a developer go deep on a subject can be great for them and the codebase. But it’s important to schedule time for them to share those learnings with the team around them. They may forget or not be naturally inclined to knowledge share. Or they may be pressured to punt on the knowledge sharing when schedules get tight.

How do we make sure developers have time for knowledge sharing?

### Lesson 2.2: Schedule 1:1 Pairings

Give multiple pairs of developers on a project weekly 1:1 pairing sessions through the lifetime of that project, and account for those 1:1s as only half theoretical capacity in team planning. I guarantee your practical team capacity will grow long term.

One caveat, 1:1s are a concentrated form of knowledge sharing between two developers. On larger teams, this can be inefficient for spreading necessary information through the team quickly.

How can we un-concentrate knowledge efficiently?

### Lesson 2.3: Schedule Mob Sessions

Mob programming is like a 1:1, but with a bunch of developers all programming at once. They can allow numerous participants to go through the same real-time challenges and investigations with each other. They’re not as commonly practiced as 1:1 pairings, but “mob programming” sessions (when done right) can be highly effective at distributing knowledge on a team.

The most potent mobs I’ve been in have been led by a developer who was at least experienced in 1:1s. Ideally, you want a leader who knows how to explain concepts and give control of the keyboard -physically or virtually- without throwing people into situations they’re not prepared for. I personally have fond memories of leading mobs of developers in converting old JavaScript files to shiny new TypeScript.

Yet, 1:1s and mobs share a flaw: they’re very transient experiences. Recordings of old sessions aren’t always useful as documentation for new team members.

How do we make our knowledge sharing not just efficient, but also useful for future team members?

### Lesson 2.4: Schedule Documentation

Schedule time for team members to create knowledge sharing resources! Add time for documentation to your release checklists, right along with code cleanup.

By “knowledge sharing resources” and “documentation” I don’t necessarily mean file-based docs, like READMEs or Notion pages -- though those can be great. Not all teams work that way – and it can be tough to keep documentation files up-to-date over time. But creating slide decks and recordings of presentations at major project inflection points is a high value way to create repeatable knowledge sharing resources.

Even if your team is in a hurry, I implore you to set aside a few hours at the end of projects for one or two team members to create a presentation on the project, and then time for the greater organization to be able to opt into that presentation. It’ll do wonders both for your long-term documentation availability and for your team visibility.

Still, I’ve been on teams that actively practice all sorts of knowledge sharing, but somehow the general architectures were still incomprehensible. How can that be? Why are some architectures inscrutable despite ample amounts of documentation?

### Lesson 2.5: Junior-Friendly Architectures

You can document an architecture all you want, but if it’s overly complex and unwieldy, it’s going to be hard to understand.

Consider the makeup of your team when designing new architectures: the range of personal experience levels, the technologies team members are familiar with, and what patterns will be straightforward or convoluted to explain to them.

Involve team members across those spans in the development of any major new architecture. Especially for more junior developers and developers not familiar with that area of your project, pay attention to how long it takes to explain the architecture. Did multiple people each take an hour of intense descriptions and hand-holding to grasp the basics? If so, you will be adding cognitive burden and significantly increased dev costs for potentially years to come. Maybe your team isn’t ready.

#### Aside: Monads

One of the most common violations of junior-friendly architectures I’ve seen in the wild is monads. Monads are a beautiful and essential part of pure functional programming. If your team is working in highly functional programming paradigms, they can be a wonderfully expressive code pattern.

But, what percentage of software developers have ever actually understood monads?
_Low._
Almost no teams use strongly functional programming, virtually no college or bootcamp curriculums teach it, and as a concept it often takes a few tries to understand.

For non-essential software patterns such as monads, unless your team contains multiple developers highly familiar with the pattern and is well positioned to onboard new developers to that pattern, the benefit of utilizing that pattern is not likely to exceed the cost. Sorry monads.

## Situation 3: Jerk Seniority

For our next big project, we learned from our mistakes. We grew as a team. We made sure to include both senior and mid-level and junior developers in the core architectural plans. This was exciting for us because that senior developer had never worked with junior developers before. What could possibly go wrong?

The lead developer blatantly ignored the very excited junior developers’ ideas and went with their own crusty, out-of-date architecture opinions. Project productivity plummeted, exhausting everyone involved, and multiple developers left the team.

### Lesson 3.1: Respect Best Practices

The most immediate _technical_ concern in this situation is that the resultant architecture violated best practices. Once in a while going against recommended standards can be good, if those standards don’t work for your particular project. But the vast majority of the time, if a framework provides strong documentation describing the ways you should or should not use it, you should probably go along with those recommendations.

You don’t have to use best practices, but you should at least respect them enough to understand the reasoning behind them.

### Lesson 3.2: Be Humble And Listen

That technical concern pales in severity compared to the personal concern of how the lead dev was behaving. Best practices were not respected because of a lack of humble listening. The lead developer assumed they knew best, did not receive inputs from other developers, and forced the project down a personal and technical bad path.

Again, you don’t always have to go with what people around you are saying: if everybody is wrong, advocate for what’s right. Advocating means hearing, understanding, and discussing opposing views. If you don’t understand someone’s view, it is foolish to argue against it. Spend the time to let them explain: doing so will make them feel heard, and it will either convince you or at least allow you to be very specific in your rebuttal.

### Lesson 3.3: Prioritize Learning

I also take issue with brashness in decision-making because it deprives developers a chance to learn. Working together as developers to collaboratively evaluate solutions and determine an optimal approach can be a wonderful thing. It’s also the best way for developers to learn how to design, which will pay dividends in future projects they get to exercise those learnings on.

Treat project kickoffs as an excuse to educate developers on the pieces of software in play. Make sure developers on the team all understand not just why the final decisions are made, but also the process behind them. How did you collect possible solutions? How did you determine their eligibility? How did each possible solution hold up against your criteria for success?

### Lesson 3.4: Involve Management When Needed

If a project is not able to spend time prioritizing learning over quick decisions, it is very likely an issue for management to tackle. The best case scenario is that lead developers are feeling pressured to deliver quickly – which is hopefully a misconception. A much worse scenario is that developers acting in a problematic way are doing so because of problematic beliefs. Either way, involve management when there is a problem that you can’t address without them.

I will note that involving someone’s manager is often not a good first step. Talking to them directly to give feedback and ask for their side of the story is very good and important. But if you’ve talked to the relevant individual contributors involved in a project and the situation hasn’t improved, management may be your best recourse.

> If you’re not accustomed to giving or receiving feedback, I recommend the book _[Radical Candor](https://en.wikipedia.org/wiki/Radical_Candor)_ by Kim Scott.
> It is primarily for the context of managers, but is wholesomely useful for all developers working with other humans.

## Situation 4: No Seniority

For our next big project, we learned from our mistakes. We grew as a team. We removed senior developers altogether - only juniors!

In other words, we put a bunch of developers who had never led a project together, told them to communicate business needs and timelines with stakeholders cross-departments, and let them loose.

### Lesson 4.1: Nothing Beats Real Experience

On its own, asking non-senior developers to lead things is not necessarily bad! Nothing beats real experience in training people on how to do complex tasks, including leading refactors and rearchitectures.

### Lesson 4.2: Give First-Timers Support

But you can’t throw people onto a problem without giving them the resources they’ll need to solve that problem. Someone who has only been in industry 1-2 years and and never taken lead on a project will probably end up learning all sorts of lessons the hard way.

As a general guideline, when asking someone to do a task for their first time, make sure there is a person mentoring them for the task who has done that task before.

#### Rule of Three

When possible, I would recommend a three-step plan for training on a task:

1. Observe: have someone observe a difficult task without directly being in a leadership role
2. Pair: have them work with someone who has done that task before, without yet giving them leadership responsibility
3. Lead: let them finally lead the task, while someone who has done that task before acts as their pair

Now, I realize this is asking for a hefty amount of pairing with your senior developers – which will take up a hefty amount of their time. Some of you may already be thinking “my seniors are too busy leading projects for all this mentoring!”.

### Lesson 4.3: Underload Seniors

Reverse those priorities. Don’t fill your seniors’ time with projects, then later assign mentoring. Let your seniors take on as much mentoring as they can, then fill the remaining time with projects.

Consider it a medium-to-long term investment: you may not have as much project bandwidth short term, while team members are being trained up, but you will have much more expertise and flexibility in assigning that expertise after 2-3 rounds of projects and growth.

Many teams have a hard time underloading seniors because they themselves are overloaded. And by “overloaded” I mean “given project time roughly equal to their capacity”.

Assume your team will overpromise and underdeliver. Life happens. The world is collapsing around us. Underask and overcompensate.

### Lesson 4.4: Underload OKRs

In my experience, teams are most frequently overloaded because of external pressures – generally from high-pressure OKRs. Objectives and Key Results are a common methodology for measuring success of groups. I won’t impart judgement on OKRs in general, as they can be useful.

But do keep in mind that if you explicitly tell a department to strive for a level of success that assumes they won’t undergo any team member departures or unexpected work, then teams in that department will be in an increasingly rushed state as the year goes on. Quality of output will suffer, work happiness will go down, and you will not have a long-term sustainable department.

> For more details on why overloading people, teams, and departments is bad, I recommend the book Slack by Tom DeMarco. It’s a great read for how to prioritize effectively and be productive without burnout.

#### Aggressive Goals

TODO INSERT GIF ABOUT "AGGRESSIVE GOALS"

The phrase “Aggressive Goals” is my personal trigger. Whenever I hear it I know leadership is lying to themselves and not taking good care of the team’s destiny. In my experience, "aggressive" almost always a terrible phrase symptomatic of deeper organizational issues.

## Situation 5: Great Success

For our next big project, we learned from our mistakes. We grew as a team. We tested our code, we knowledge shared on testing and other important knowledge areas, we mixed junior, mid-level, and senior developers with effective feedback and teamwork communications, we set realistic goals with padded time bounds…

…and we did it! We shipped a project successfully!

TODO INSERT GIF

### Lesson 5.1: Celebrate Your Successes

When your team does something great, give them positive reinforcement. Announce it on Slack or Teams or email. Hold presentations explaining the new thing. Put it in people’s review packets.

Failing to celebrate successes implies they’re not worth celebrating. It gives the impression that nothing is good enough, which over time can discourage team members from wanting to go the extra mile.

When you do raise visibility on successes, you encourage team members to keep doing that. Folks will be motivated to work with you because they know they’ll be able to accomplish greatness – and be recognized for it.

#### But Why?

TODO INSERT GIF

Don’t just question your failures – question your successes. What made your successful projects work well? What lessons can be learned and reused on other projects?

### Lesson 5.2: Quantify Benefits

First, it’s a good idea to understand why the project can be considered a “success”. What tangible benefits came from that work? Why was it worth the time investment?

In the context of refactors and rearchitectures, consider explicitly finding ways to describe improved product quality and/or team velocity. This holds true both for promoting past successes and advocating for spending time on future improvements.

Here’s a pair of screenshots from a presentation I once gave showing the amount of boilerplate needed for a common task being reduced from a five files to one.

TODO INSERT PRESENTATION SCREENSHOTS

We promoted the heck out of that change! It didn’t just make our code prettier or easier to deal with – it significantly reduced the development cost for that common task.

Consider the needs of the people you’re trying to convince. Nontechnical stakeholders generally don’t directly care how clean your code is, only indirectly: in that it seems to make you more productive. But everybody loves to hear that features will take less time to release, and be less likely to include bugs.

### Lesson 5.3: Quantify Penalties

In addition to quantifying how your production could or did improve, consider also describing why things weren’t great before. How painful is some defect is, in terms of OKR-related numbers? What examples can you demonstrate to show this? Bugs, slow releases, inarticulate onboarding docs?

Stll, many teams find it hard to budget for refactors. When you have pressing product deliverables, even something that pays for itself after two months could still be too big of an investment.

### Lesson 5.4: Incremental Victories

Sometimes the only way to achieve refactors is to do them incrementally. You might only be able to get a small time budget each sprint, conditional on measurable improvements for the team. You might be working with nontechnical stakeholders who don’t see tech debt as a necessary investment.

In both cases, it’s crucial to quick demonstrate enough value to justify your time investment. Overhauling the entire project, creating a huge integration branch, exhaustively QAing all changes, and then merging that branch takes an obscenely long time before showing results. It’s often best to apply your refactor bit by bit – allowing small improvements to be demonstrated much sooner.

### Lesson 5.5: Incremental Refactors

Now we land on the last lesson of them all: the value of incremental refactors. The best way to power your incremental victories: patterns that allow you to simultaneously use old and new code while deprecating the old code.

I’ll give you three high-level strategies that I’ve enjoyed in the past.

#### Strategy 5.5.1: Keep Both Alive

First, consider just not modifying all existing code at once. Sometimes it’s ok to have two areas of code that do the same thing – for the sake of getting the fun new code out sooner.

If you do allow multiple versions of code to exist at once, be sure to explicitly annotate the old code as no-longer-ok-to-use. Otherwise developers will ignore your pleas and keep using whatever code areas they’re used to.

Most languages have a standard way to mark constructs such as classes and functions as deprecated. Many editors will visualize calls to deprecated code differently.

TODO JavaScript or TypeScript code marked as deprecated, with VS Code’s strikethrough text decoration.

#### Strategy 5.5.2: Wrap the New

Another strategy is to “hollow” out existing code by making it call to newer, better code. Replace internal logic from old code with calls to the new code – effectively making the old a thin shell over the new.

In code terms, that can sometimes be as simple as directly calling the new function from the old. In practice, you’ll likely have to change the structure of the data passed in.

TODO CODE

#### Strategy 5.5.3: Wrap the Old

Lastly, you can go the other way: “wrap” existing code with the newer, better API. This way, you keep parts of the internal implementation that may be difficult to refactor, but the API on top is the result you’d like to end with.

In code terms, that can sometimes be as simple as directly calling the new function from the old. In practice, you’ll likely have to change the structure of the data passed in.

TODO CODE

## Thanks

TODO SPEAK MORE

-   Ian
-   Kip

TODO ADD SPONSOR ME REQUESTS
