---
title: CVE-Driven Attack Technique Prediction with Semantic Information Extraction and a Domain-Specific Language Model
emoji: 📝
topics:
  - markdown
published_at: 2024-12-19 22:30
tags:
  - paper-note
---

# CVE-Driven Attack Technique Prediction with Semantic Information Extraction and a Domain-Specific Language Model

This is my personal note about the paper introduction.
https://arxiv.org/abs/2309.02785

## Abstract

This paper proposed new techniques called "TTPpredictor" which predict TTP
within the ATT&CK framework by CVE information. They uses Semantic Role
Labeling(SRL) and SecureBERT. The method's accuracy is over 90%.

## Objective

CVE are common vulnerability format but it don't describe how to be used by
attacker(TTP). This paper focus to fill the gaps.

- RQ.1: How can semantic role labeling techniques be effectively employed to
  generate a labeled dataset in the cybersecurity domain for different tasks?
- RQ.2: To what extent does the utilization of context-oriented classification
  model design enhance the performance and robustness of the classification
  approach?
- RQ.3: What are the strengths and limitations of the proposed methodology for
  the functionality-based classification of CVEs, and how can it be improved
  using state-of-the-art language models such as ChatGPT?

## Methods

- Data Extraction, Annotation, and Assessment
  - Extract attach action from CVE descriptions with using SRL.
  - Express attack action by SVO format and maps MITRE ATT&CK Framework
- Use SecureBERT
  - SecureBERT learning relativity between SVO contents and CVE description.

## Results

- Proposed methods "TTPpredictor" achieved approximately 98% accuracy categorize
  to TTP for CVE.
  - F1 Score is 95% ~98%
- TTPpredictor performance is better than ChatGPT
  - Test 100 randomly selected CVEs
    - TTPpredictor achieves an average accuracy of 93%
    - ChatGPT’s accuracy is 20%.

## Interesting points

- Extract SVO structure from CVE description using SRL.
- The method is able to predict TTP from CVE with higher accuracy than I had
  thought.

## Phrase

> We present novel techniques implemented in the TTPpredictor tool to analyze
> the CVE description and infer the plausible TTP attacks caused by exploiting
> this CVE.
