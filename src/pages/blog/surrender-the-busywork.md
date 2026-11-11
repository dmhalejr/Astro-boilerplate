---
layout: '@/templates/BasePost.astro'
title: Surrender the Busywork. Keep the Thinking.
description: Cognitive surrender is real. The fix is not to stop handing work to AI, it is to agree on which work.
pubDate: 2026-11-11T18:00:00.000Z
---

Addy Osmani wrote a post called [Cognitive Surrender](https://addyosmani.com/blog/cognitive-surrender/) and I have not stopped thinking about it.

His argument, short version: there is a difference between handing a task to AI and still owning the answer, and letting the AI's answer become yours without ever forming your own. The first is offloading. The second is surrender. He points to a Wharton study where people accepted a wrong AI answer 73% of the time and felt more confident doing it.

He is right. I have done everything on his list. I have approved a long diff because the tests were green and the names looked sensible. I have pasted a stack trace, taken the fix, and moved on without understanding the bug.

But I landed somewhere a little different. I do not think surrender is the problem. I think surrendering the wrong things is.

## Not All Work Deserves Your Brain

A lot of what fills an engineer's week was never thinking in the first place. Renaming things across forty files. Bumping dependencies. Writing the same fixture for the ninth time. Turning a ticket into a branch into a pull request with the right labels on it.

Nobody got into this work to do that. Nobody gets better at their job by doing it carefully. If an agent takes all of it and I never form an independent view of how it wrote a changelog entry, I have lost nothing.

That is surrender, by the definition in the paper. I am fine with it. That is the whole reason I build agents: to take the work that was wasting people in the first place.

## Where It Bites

The trouble is that the same reflex does not stay in its lane.

Once you are used to accepting output for the boring work, you start accepting it for the work that matters. The design decision. The transaction boundary. The bug you do not understand. It feels identical from the inside, and that is the part of Addy's post that stuck with me most. As he puts it, "The surrender was the absence of a decision."

I have been burned by this. Not by an agent doing something wild, but by me saying yes to something I could not have explained an hour later. The agent was not the failure. My approval was.

## Do Not Rely on Willpower

Addy lists personal habits for staying sharp, and they are good ones. I just do not trust myself to keep them on the fifth review of the day, and I do not think anyone else should trust me to either.

So I would rather build the discipline into the system than into my mood:

- **A person makes the final call.** The agent can open the pull request. It cannot merge it.
- **Claims come with evidence.** If an agent says something is wrong on a line, it has to quote the line. If the quote is not there, the claim gets thrown out.
- **Small scope.** A change I can read beats a change I can only skim.
- **Nothing by default.** An agent gets the tools and access the job needs and no more.

None of that makes me smarter. It makes it harder for me to be lazy at the exact moment I am most likely to be.

## The Part I Think About as a Dad

I have kids, and this is not really a software question for them.

They are going to grow up with a confident answer one question away, for everything. I am not worried about them using it. I am worried about them never finding out what it feels like to work something out, be wrong, and fix it themselves. You cannot choose what to hand off if you never learned to do any of it.

I want them to surrender the busywork too. I just want them to know the difference.

## Teams Need to Say This Out Loud

Here is what I actually want people to take from this. It is not a personal failing, and it will not be fixed one engineer at a time.

Every number a team watches looks the same either way. Pull requests merged, tickets closed, features shipped. None of it can tell "I built this and understand it" from "the agent built this and I clicked approve." If the dashboard cannot see it, nobody will bring it up unless someone decides to.

So bring it up. Three questions worth asking as a team:

- What work are we happy to never understand in detail?
- What work do we always want a person to be able to explain?
- If the agent were gone tomorrow, who could fix this system?

Write the answers down. Disagree about them. The list will be different for every team, and that is fine. What is not fine is everyone quietly drawing their own line and hoping it is in the same place as everyone else's.

Surrender the busywork. Keep the thinking. And agree, out loud, on which is which.
