---
title: "When LLMs Meet Cybersecurity: A Systematic Literature Review"
emoji: 📝
topics:
  - markdown
published_at: 2024-12-04 23:00
tags:
  - paper-note
---

# When LLMs Meet Cybersecurity: A Systematic Literature Review
This is my personal note about the paper.
https://arxiv.org/abs/2405.03644

## Abstract
The study researches how LLMs affect cybersecurity.
They analyze over 180 works, 25 LLMs, and more than 10 scenarios.
This survey aims to serve as a resource for the area of cybersecurity and LLMs, and provides an updated list of practical guides on using LLMs for cybersecurity.

## Objective
The survey aims to answer three questions:

1. How can cybersecurity-oriented domain LLMs be constructed?
2. What are the potential applications of LLMs in cybersecurity?
3. What are the existing challenges and future research directions regarding the application of LLMs in cybersecurity?

## Question Details
### RQ1
- Research key technologies for fine-tuning:
	- CPT, SFT, FULL, PEFT
- Selection of Base Model.
	- Evaluate Cybersecurity knowledge
	- Secure code generation
	- IT operation capability
- Fine-tuned Domain LLMs
	- Vulnerability detection, Secure code generate, Automated program repair, Binary, IT operations, Cybersecurity knowledge assistants.

### RQ2
Review the following topics:
- Threat Intelligence
- Fuzz
- Vulnerability Detection
- (In)Secure Code Generation
- Program Repair
- Anomaly Detection
- LLM Assisted Attack
- Others

### RQ3
- Challenges
	- Attack Against LLMs
	- LLMs Jailbreaking
	- Others
- Further Research
	- LLM Agent for Cybersecurity

## Answers
### RQ1
> For researchers, it is a feasible technical route to construct the cybersecurity LLM by tuning a general LLM with cybersecurity data using methods such as CPT and SFT, and implementation techniques depend on the specific application scenario, resource availability, and the expected level of performance improvement

### RQ2
LLMs have great potential in cybersecurity, but relevant research is still progressing.
In the future, to better apply LLMs to cybersecurity, further investigation is needed.
### RQ3
#### Answer 1
>Despite the powerful capabilities of LLMs, they inherently possess certain weaknesses and vulnerabilities, making them susceptible to attacks. In particular, jailbreaking poses significant security risks to the application of LLMs.

#### Answer 2
>Extending the tool-use and API-call capabilities of LLM, coupled with the design of autonomous intelligent agents capable of understanding, planning decisions, and executing complex tasks within cybersecurity applications, will significantly advance the utilization of AI in the cybersecurity domain.
## Interesting points
- This paper includes a GitHub repository and be updated.
	- https://github.com/tmylla/Awesome-LLM4Cybersecurity
- This paper reviews a wide range of studies, so if I want to study LLMs for cybersecurity, I should read it.
## Phrase
> Our findings raise questions about the widespread deployment of LLMs.