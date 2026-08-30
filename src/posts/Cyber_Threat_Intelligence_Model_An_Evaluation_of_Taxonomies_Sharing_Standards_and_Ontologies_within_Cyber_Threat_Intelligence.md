---
title: "Cyber Threat Intelligence Model: An Evaluation of Taxonomies, Sharing Standards, and Ontologies within Cyber Threat Intelligence"
emoji: 📝
topics:
  - markdown
published_at: 2024-12-22 22:30
tags:
  - paper-note
---

# Cyber Threat Intelligence Model: An Evaluation of Taxonomies, Sharing Standards, and Ontologies within Cyber Threat Intelligence

This is my personal note about the paper. https://arxiv.org/abs/2103.03530

## Abstract

This paper evaluates cyber-threat-intelligence-relevant ontologies, sharing
standards, and taxonomies pertaining to the who, what, why, where, when.
Furthermore how elements of threats and attacks in addition to courses of action
and technical indicators

## Objective

This paper aims at to create the cyber threat intelligence model to distinguish
different types of information in favor of representing the five W’s and one H
of threats and threat operations in addition to technical indicators and courses
of action.

## Existing Problems

- There is little focus on designing ontologies for cyber threat intelligence,
  particularly ontologies.
- Ambiguity in defined concepts that prevents ontology integration and adoption.
- Extensive use of prose and limited utilization of existing taxonomies and
  vocabularies, in the result in a lack of interoperability and reasoning.
- Lack of relationships between concepts that could otherwise allow deriving
  comprehensive explainable views.
- Minor use of semantic axioms and constraints in support of consistency
  checking and information inference.

## Cyber Threat Intelligence Model

The proposed original model called "Cyber Threat Intelligence Model"

- **Identity**: Threat actor's real information
- **Motivation**: The reason why attackers take action.
- _Goals_: The objective what attackers acheves.
  - Typical examples of goals are ”steal intellectual property”, ”damage
    infrastructure”, and ”embarrass a competitor”.
- **Strategy**: no-technical high-level description of the planned attack.
- **TTPs**: Technical tactics, techniques, and procedures.
- Attack Pattern: relates to TTPs and describes behavior attackers use to carry
  out their attacks.
- **Malware**: relates to TTPs and the capability of the adversary and refers to
  software inserted into a system.
- **Infrastructure**: describes any system, software service, and any associated
  physical or virtual resource intended to support an adversarial operation.
- **Tools**: attackers install and use tools within the victim’s
  network/infrastructure.
- **Indicators of Compromise**: are actionable technical elements/artifacts
  consumed by cyber security tools to detect intrusions.
- **Atomic Indicators**: the value of atomic indicators is questionable due to
  their limited context and possible short shelf life.
- **Target**: represents the entity an attack is directed to and can be an
  organization, a sector, a nation, or an individual.
- **Course of Action**: refers to measures that can be taken to prevent or
  respond to attacks.

## Result

- The limitation of those ontologies is that they are not connected or unified.
- The analysis of the existing works confirmed that there is still a tiny focus
  and much work to be done to establish a comprehensive and unambiguous cyber
  threat intelligence ontology.
- Barriers to overcome include little focus on dedicated ontological cyber
  threat　intelligence efforts that can account for the strategic, operational,
  and tactical levels.

## Thoughts

The paper looked like a good overview of threat intelligence.

## Phrase

> Our study concluded that there is much work to be done before achieving a
> contextual and unambiguous cyber threat intelligence ontology.
