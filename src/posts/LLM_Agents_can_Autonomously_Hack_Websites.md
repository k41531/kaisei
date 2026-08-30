---
title: LLM Agents can Autonomously Hack Websites
emoji: 📝
topics:
  - markdown
published_at: 2024-12-01 8:00
tags:
  - paper-note
---

# LLM Agents can Autonomously Hack Websites
This is my personal note about the paper.
https://arxiv.org/abs/2402.06664

## Abstract
The study investigates the capability of LLMs to hack websites.
Frontier model(GPT-4) succeeded 73.3% websites hacks on this research tasks.
A frontier model(GPT-4) successfully hacked 73.3% of the vulnerabilities in the task.
These findings suggest potential risks associated with deploying LLMs.
In addition this study show that GPT-4 is capable of autonomously findings vulnerabilities in real-world websites.
## Objective
The capabilities of LLMs aer advancing rapidly, and they have been applied to various tasks.
However, the exploration of autonomous agents performing aggressive security tasks remains limited. This study examines the hacking performance of LLMs.
## Methods
- Using Models
	- GPT-4 assistant
	- GPT-3.5 assistant
	- Opened LLM models
		- LLaMa, Mixtral, etc...
- Frameworks
	- LangChain
- Security Tasks
	- XSS
	- SQL Injection
	- SQL Union
	- CSRF
	- etc...
- Environments
	- Vulnerable websites(**LLM agent don't know the vulnerability**)
	- Real-world websites in Sandbox.
- Ablation Studies
	-  With document reading or not
	-  With detailed system prompt or not
	- With both or not.
## Results
- GPT-4 succeeded 73.3% tasks.
- GPT-3.5  succeeded 6.7% tasks.
- Opened LLMs 0%
- GPT-4 find XSS vulnerability on one of the approximately 50 websites.
- Top rate hacked vulnerabilities
	- SQL Injection, CSRF, 100%
	- XSS, Brute Force, SQL Union, 80%

## Interesting points
- The capability of LLMs to hack without prior knowledge of vulnerability information.
- The API costs is lower than human experts.
## Phrase
> Our findings raise questions about the widespread deployment of LLMs.