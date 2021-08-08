---
title: Don't Write Bad Code
date: "2021-08-09T12:34:56.117Z"
description: "A mantra for constantly learning to keep myself writing at my best."
---

My first experience working with legacy software was on a large business product back in 2015 -- my first year of full-time employment.
Although I'd worked on teams during internships and in student projects before and started my own side projects, prior to then I'd never touched something with years and years of accumulated technical debt.
That experience would shape my career for years to come and helped inform my personal most cherished programming rule: _"Don't Write Bad Code"_.

At the time (and to the credit of the engineering team, I believe this is generally no longer the case), large swathes of the project were Frankensteinian mismatches of various technical efforts over the years.
Any given engineering task had a non-trivial probability of being unexpectedly nigh impossible without either a major cleanup & refactor or an excruciating addition of even more technical debt.

As a software developer or adjacent reading this post I hope your reaction contains hope the team often chose the cleanup & refactor.
As a realist I can tell you that that over the years, with business goals and deadlines perpetually looming, cleanups often "couldn't" be prioritized.

## Don't Write Bad Code: A Mantra

I, an annoyingly passionate 22-year-old, came away from the project with a mantra that I would never write bad code again.
I was very proud of that mantra.
It has few nuances I've honed over the years that I'm excited to go over here.
With those nuances I think it might be better phrased as _**"don't allow yourself to write bad code"**_ but that doesn't quite roll off the tongue as well.

> Actually, the mantra originally used a four-letter word considerably more vulgar than "bad" (I was very angsty back then).
> For SEO and approachability purposes I've toned it down.

### Growth Mindset

To consider yourself finished learning a topic is to say that you have accumulated all knowledge that could ever help you with that topic, including ideas that haven't been learned yet.
That's rather arrogant, don't you think?

[Carol Dweck](https://en.wikipedia.org/wiki/Carol_Dweck)'s research into mindsets created one of the few buzzphrases I actually respect: [growth mindset](https://en.wikipedia.org/wiki/Mindset#Fixed_and_growth_mindset).
No matter your situation, you generally can and should adopt the resources around you to learn from.

I was once adjacent to a React project that paired several relatively senior backend engineers with several relatively junior frontend engineers.
One backend engineer took it on themself to enforce what they saw as proper backend programming principles in the frontend React code and stubbornly refused to accept inputs from the other developers that doing so was leading the codebase down the wrong path.
It was a pity: the perceived backend practices did not apply to React, the rejected frontend inputs actually were canonically correct React best practices, and the team suffered from the conflict.

### Learn Before Committing

Beyond failing to work effectively with other engineers, the first key mistake the developer in that adjacent project made was to assume that their pre-existing ideas could be copy and pasted into a totally new area.

Don't be like that one developer.
Validate whether you have more to learn before committing to an approach for a project.
If you're working in tech stack you haven't worked with before then you almost certainly will need to understand best practices for each unfamiliar part of the stack: framework(s), language(s), and all.

I like to use a prerequisite of learning as a personal enforcement strategy for not writing bad code.
Until I have validated that I understand the right way to approach a project, I don't feel comfortable believing the code I write to not be at least sub-optimal.
In other words, I assume bad code until I prove otherwise to myself.

### Learning Over Time

On a related note, modern programming practices are constantly evolving.
What was considered a good practice at the start of a project may be considered outdated -even "bad"- only a year or two later.

Part of not writing bad code is paying attention to the major trends of projects I'm working on.
I am a frontend developer, so my areas of code are undergoing frequent and rapid changes in best practices.

???

### Leave If Necessary

Nobody likes leaving a team.
After putting months or years of thought and time into an area of code and group of people, it can feel like you're abandoning both the code and the people.

Personal growth is one of the most important parts of a healthy career though.
Learning how to [work effectively with legacy code](https://www.oreilly.com/library/view/working-effectively-with/0131177052) is only one of many very valid areas to learn as a programmer.
A good programming team should display an ability and desire to help you grow in healthy development practices.

At the end of the day, either your team is helping you learn how to write "good" code (whatever that means for your area of programming) or it is not.
If it is not, or is but at a slower rate than you are likely to get elsewhere, consider whether you are at a stage in your career where you are ok with not learning.

I left the team with all the legacy code even though I liked many of the people on it and still could have learned a great deal from them.
The business unit in question had many talented developers who were saddled with years, or in some cases even _decades_ (!), of previous technical indebtitude.
I wanted to grow not in wrangling with them but instead in understanding modern programming techniques and a more modern tech stack.
It was the right decision for me.

## You Can Break the Rules

I broke my most cherished programming rule this month.
I wrote bad code.

We had a sudden time-sensitive high-reward project come up that happened to touch areas of our systems that already had technical debt the team was hoping to tackle long-term.
I again saw the dreaded choice between short-term gain and long-term health, and I chose short-term again.

Shame on me?
No!
It was a valid decision at the time.
Taking on some technical debt allowed the project to be successful within its limited time-frame and with a great deal of benefit to the business.

### Sometimes You Have To

Sometimes you have to break your rules.
As with a Jewish doctor performing life saving surgeries during Shabbos, or a firefighter breaking down a stranger's door to save their life, all reasonably written rules contain escape hatches for emergencies.
In my much less critical case I broke my _"Don't Write Bad Code"_ rule because the business opportunity far outweighed the downsides of the added tech debt.

I still like to "punish" myself when I break the rules, though: not because I have to but because programmer's penance is cathartic.
When I cause a bug on production I like to fix it and another few bugs.
When I add tech debt I like to clean it and/or other existing tech debt after.
This month, I notified stakeholders and technical owners that the systems needed to be overhauled soon, then made sure ownership handoffs preserved that information.
