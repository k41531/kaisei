---
title: "Cross-Site Scripting Attacks and DefensiveTechniques: A Comprehensive Survey"
emoji: 📝
topics:
  - markdown
published_at: 2024-12-19 22:30
tags:
  - paper-note
---

# Cross-Site Scripting Attacks and Defensive Techniques: A Comprehensive Survey

This is my personal note about the paper introduction.
https://www.scirp.org/journal/paperinformation?paperid=119069

## Abstract

This survey researched about XSS attacks types, detection and prevention through
study and reviewed several research papers and publications. Defensive
techniques for preventing XSS is be able to categorize five.

- Machine learning techniques
- Server-side techniques
- Client-side techniques
- Proxy-based techniques
- Combined approach

## XSS Types

### The Traditional XSS attacks

The majority of existing cutting-edge XSS defensive approaches is for these.

#### Stored XSS

- Also known as a persistent XSS.
- The malicious script is stored in database and executed by other user.
- This is the most popular method and most common approach neutralized.

#### Reflected XSS

- Also know as a non-persistent XSS.
- The attacks occurs when the target clicked attacker generated URL.
- Author think reflected XSS attacks are often more difficult then stored XSS.

### The Newly XSS attacks

There is currently no reliable solution to provide for these.

#### DOM-based XSS

- This attacks are principally distinct from other types of XSS.
- Do not necessitate communication with a server in any way.
- Require an extensive understanding of the browser’s DOM and JavaScript.

#### Mutation-based XSS

- Dr. Mario Heiderich unveiled six new mXSS attack sub-classes in his
  publication.
  - https://link.springer.com/chapter/10.1007/978-81-322-2517-1_22
- Malicious script executed by data muted while HTML loading.
- The attack can circumvent server-side defenses and client-side filters.

## Interesting points

- mXSS
  - mXSS has been used to circumvent solutions such as DOMPurify, OWAS AntiSamy,
    and Google Caja, and a large number of popular web apps have been discovered
    to be vulnerable.
- General methods for preventing XSS attacks table.

## Phrase

> Presently, no dependable solution can provide appropriate protection against
> the recently found form of XSS attack known as DOM and mutation-based XSS
> attacks.
