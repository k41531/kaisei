---
title: "Conti Inc. : Understanding the Internal Discussions of a largeRansomware-as-a-Service Operator with Machine Learning"
emoji: 📝
topics:
  - markdown
published_at: 2024-12-21 21:00
tags:
  - paper-note
---

# Conti Inc. : Understanding the Internal Discussions of a large Ransomware-as-a-Service Operator with Machine Learning

This is my personal note about the paper.
https://crimesciencejournal.biomedcentral.com/articles/10.1186/s40163-024-00212-y

## Abstract

This paper research the internal operations behind RaaS. In 2022 leaked chat log
of the Conti RaaS operator so they analysis it with using machine learning
techniques such as Natural Language Processing (NLP) and Latent Dirichlet
Allocation (LDA).

## Objective

This paper aims at to uncover insights into the organization of RaaS(Conti).

## Methods

- NLP (Natural Language Processing)
  - To clean the chats.
    - normalization
    - removed all irrelevant material
    - tokenized the text
    - lemmatized the text
- LDA (Latent Dirichlet Allocation)
  - This is a topic modeling method based on a generative probabilistic model
    for text corpora.
- Visuallization
  - WordClouds
  - pyLDAvis

## Main Chat Log Topics

- Business topic
  - Discussions regarding planification and internal tasking.
  - Words
    - build, office, task, report
    - system, coder, software
- Technical topic
  - Revolved around technical talks and developing technical projects.
  - Words
    - version, command, module, program, function, system, window.
    - script, loader, backdoor, .exe
- Internal tasking/Management topic
  - The only one without any computer science or technical words in it.
  - Words
    - salary, people, money email, network, talk, team, buy, month, touch,
      company, blog, offer.
    - onion, protonmail_com
- Malware topics
  - Alluded injection or implementation of the malware.
  - Words
    - DLL, detect, crypto, crypt, loader, pour
- Customer Service/Problem-solving topics
  - Customer service and solve technical problems.
  - Words
    - order, payment, client
    - error, module, proxy, IP

## Characteristics

- 95.62% actors were all-rounders, they discussed around all topics.
- Only 4.38% actors were specialized in a single topic.
- Organizations are organized similarly to firms.

## Interesting points

- Big boss(Actor 112) and Effective head of office operations(Actor118) dominant
  topics is 99% business.
- LDA models cannot capture contextual information, it only considers the
  frequency of words in a corpus.

## Phrase

> Even for cybercrime organizations, the bigger the organization becomes, and
> the more 'all-rounder' individuals are required to sustain the economic
> activities.
