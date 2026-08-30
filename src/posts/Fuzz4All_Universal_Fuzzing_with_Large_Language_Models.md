---
title: "Fuzz4All: Universal Fuzzing with Large Language Models"
emoji: 📝
topics:
  - markdown
published_at: 2024-12-07 23:00
tags:
  - paper-note
---
# Fuzz4All: Universal Fuzzing with Large Language Models
This is my personal note about the paper.
https://arxiv.org/abs/2308.04748

## Abstract
They suggested new fuzzing methods by using LLM named Fuzz4All.
It solve current fuzzing issue which can only use specific languages so it is not easy to apply other language or other versions.
Fuzz4All found 98 bugs in GCC/G++, Clang/Clang++, Z3, CVC5, Go, javac and Qiskit.
## Objective
Develop Universal Fuzzing tool which can use any languages and any systems.

## Contributions
- Universal Fuzzing
- Autoprompting for Fuzzing
- LLM-powered fuzzing loop
- Evidence of real-world effectiveness
## Methods
### Autoprompting for Fuzzing
1.  User input that documentation of the SUT, example code snippets, or specifications for generate fuzzing input and LLM generate sample multiple candidate inputs.
2. LLM generate multiple code snippets from candidate inputs.
3. Scoring and testing code snippets and select best prompt.
### Fuzzing Loop
1. LLM generate fuzzing inputs from receive input prompt and test on SUT.
2. Selec  fuzzing input form a previously generated input as an example.
3. Select strategies to update input which is "generate-new", "mutate-existing" or "semantic-equiv.
## Results
- Fuzz4all achieved average 36.8% improvements coverage than base line fuzzing tools.
- Found 98 bugs and confirmed 64 bugs by developers.
## Interesting points
- Qiskit(quantum computing platform) is targeted.
- Fuzz4All is only 872 LoC (Lines of Code).

## Phrase
> This paper presents Fuzz4All, the first fuzzer that is universal in the sense that it can target many different input languages and many different features of these languages.