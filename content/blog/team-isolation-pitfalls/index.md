---
title: "Team Construction Pitfalls"
date: "2021-01-01T01:01:01.117Z"
description: "How misbalanced or poorly positioned teams hurt themselves technically in both the short and long term."
---

**TODO: IMAGE**

<em style="display:block;margin-bottom:2rem;text-align:center;">
“I know that I know nothing.” - Socrates, paraphrased by Plato, paraphrased
<br />
</em>

Why is it that fresh new teams seem to always create tech debt before their first release?

I'm not talking about the normal growing pains of expanding a small area of code; I mean the really divergent patterns that make existing developers think _"this is so off; why didn't they talk to us?"_.
Maybe this isn't an issue you've experienced, but for me, it's been a consistent pain point with new product teams I've been on or partnered with over the last few years.

In this blog post, I will provide vague anecdotal observations rail against and  to support the following three tenants:

1. Don't deprive junior developers of senior developers _(or vice versa)_
2. Don't deprive new developers of area experts
3. Don't lie to yourself about timelines

> Each anecdote is a real occurence I observed or participated in, though anonymized and slightly obfuscated.

## Preamble: Junior verses Senior

**TODO: IMAGE**

When does someone become a junior developer after learning to code?
When do they become mid-range, or senior, or staff, or principle, or whatever else?
What counts as "experience", and how do you measure it?

I don't fully understand the answers to any of those questions.
If you've started to learn to code, you're a developer.
For the sake of this easier writing, let's consider "junior" to be people who haven't yet gained repeat experience effectively performing the tasks described below, and "senior" to be those who have.

## 1. Overstocking Junior Developers

**TODO: IMAGE**

> Anecdote: an intern and a junior developer on a relatively new team were tasked with creating a new variation of an existing, tech-debt-heavy page.
> They gave an initial estimate of about a week, started working on code, and quickly realized they'd need help.
> They met with an experienced developer who gave advice on splitting components and code reuse.
> Under perceived pressure to complete the asignment, however, they copy&pasted several folders of legacy code and edited them for the new page variant. 

Some requirements of developer project planned are inherently difficult when you haven't already planned multiple projects.
Writing RFCs, accounting for existing technical debt, updating stakeholders -- you want to give people help when doing these for the first time.
A healthy development team should pair its junior and senior developers together on advanced tasks such as project planning and architecture changes.
Only a fool would "blame" the intern or junior developer from the anecdote.

I'm not saying junior developers shouldn't participate in or even help lead major new investments -- practical experience is a great way to build seniority.
Nor am I saying junior developers _can't_ build big things -- they can and should.
I'm saying they ideally shouldn't do it _on their own_.

Time and time again I've seen junior developers asked to do advanced tasks without adequate support, struggle to output as effectively as a senior, then blame themselves for reduced output.
What an effective way to burn out your new developers!
At the _very least_, when tackling larger tasks, they should be paired from the start with a more experienced developer who can assure them the assignment should be treated as a safe learning exercise.

### Understocking Junior Developers

Similarly, it is unhealthy to have too many _senior_ developers on product teams.
While some teams -such as platform owners- might need many years of experience in each developer, most product teams are excellent opportunities to give your senior developers experience in mentoring juniors.
Just as you don't want juniors to be impeded on their own, you also don't want seniors to stagnate in their knowledge sharing, intaking fresh new ideas, and ability to create understandable architectures.

Junior developers provide a fresh perspective to a team that should not be underestimated.
If you don't think you need them, or if you don't think your teams have time for them, I question you sharply.

## 2. Understocking Area Experts

**TODO: IMAGE**

> Anecdote: an existing team onboarded a set of contractors to help them create a more advanced version of their existing pages.
> The contractors were given a large, discrete chunk of the project.
> After their code started to land into land into the main branch, other teams noticed it didn't use the existing design system components or recommended logical patterns.
> Eventually the project was scrapped and code deleted for being too difficult to integrate with existing areas.

There is no such thing as a ["Greenfield project"](https://en.wikipedia.org/wiki/Greenfield_project) in software development.
In an existing organization, there should be established precedences and guidelines around how to structure code.
Even in a brand new organization there are existing areas of familiarity for developers that should inform what to use.

When an organization adds new developers, it is unhealthy to ask them to create code without onboarding them onto the existing guidelines and ongoing pushes of the team.
To truly onboard an engineer onto a team's code takes months or more of having them work in the existing codebases with the existing engineers.
Thus, it is unhealthy to spin off a new team solely with new team members, regardless of their general experience level.

When you match area experts with developers new to the organization, both sides benefit.
Area experts can inform the new developers on existing areas of investment and/or tech debt that should be factored into their work, along with why structures were set up that way.
The new developers can bring in new proposals from the outside and work with the area experts to introduce new ideas to the team.

## 3. "Aggressive Goals"

**TODO: IMAGE**

> Anecdote: a new team worked with upper management to propose what could be created in a year given company priorities.
> Management created business goals and OKRs based on a very optimistic version of that timeline, referring to them as "aggressive goals" internally.
> The team opted to start product work quickly instead of writing RFCs or laying groundwork with platform owners.
> Additions to existing code were made quickly and added an above expected amount of tech debt, the cleanups for which were added to the team backlog but not started on before launch.

At what point does adding early tech debt for the sake of speed no longer worth it?
Tech debt can be costly immediately when added to shared code areas, not just as an afterthought following a project's first launch.
I have heard many justifications for the fast pace: proving a team's value; acquiring early user experience data to inform later experiments; critical business needs...
These are all theoretically valid, but in practice I have developed a deep suspicion towards the frequency with which they're used.
I've been burned too many times by a _perceived_ urgent need for release followed by long periods of inactivity.

TODO: THIS IS NOT WELL SUPPORTED

Furthermore, let's dive in: what does an "aggressive" goal imply?
Were teams not striving for high velocity before?
Assuming teams were already trying to perform their best, what would they sacrifice to obtain the "aggressive" adjective?

In my experience, referring to team goals as "aggressive" implies pushing the team beyond what it would normally be comfortable achieving.
This is not healthy.

> If these statements interest you, I would highly recommend reading _[Slack](https://www.penguinrandomhouse.com/books/39276/slack-by-tom-demarco)_ by Tom DeMarco, which includes excellent points on how and overly aggressive goals contribute to inefficiency and team burnout.

## In Conclusion

**TODO: IMAGE**

Mistakes in organizing large groups of people, developers or otherwise, are inevitable.
I hope you can be well equipped to predict and mitigate some common pitfalls after reading this blog post:

1. Don't deprive junior developers of senior developers _(or vice versa)_
2. Don't deprive new developers of area experts
3. Don't lie to yourself about timelines

In conclusion: if you're setting up a product team, make sure it have a healthy mix of junior and senior developers, a healthy mix of fresh faces and area experts, and realistic timelines to strive for.
