---
layout: '@/templates/BasePost.astro'
title: Introducing health-types
description: TypeScript types for HL7 FHIR, generated from HL7's own definitions and faithful to the specification.
pubDate: 2026-11-11T12:00:00.000Z
---

I built [health-types](https://github.com/dmhalejr/health-types) to solve a problem anyone writing FHIR in TypeScript runs into sooner or later: the types you can generate from HL7's JSON Schema compile happily against resources the specification says are invalid.

FHIR is the standard healthcare systems use to exchange data, and its specification is strict about what a resource must contain. The JSON Schema HL7 publishes alongside it is much looser. For R4, it leaves 199 of 318 required top-level fields optional. Types built from the schema alone inherit that gap, and that never sat right with me, so I decided to build something about it.

## What is health-types?

health-types is a set of TypeScript types for the HL7 FHIR standard, covering four releases: **STU3**, **R4**, **R4B** and **R5**. The key distinction here is that the types are **generated from the specification's own data** -- the structure definitions and value sets HL7 publishes next to the schema -- not just from the schema itself.

It is types only. There is no runtime code and there are no dependencies, so it installs as a dev dependency and adds nothing to your bundle.

## How It Works

The workflow is two steps:

### 1. Install

```bash
npm install --save-dev health-types
```

### 2. Import the type you need

Every type lives in its own file, and the import path is `health-types/<VERSION>/<TypeName>`. There is no index to pull in, so you load only what you use.

```ts
import type { Observation } from 'health-types/R4/Observation';

const heartRate: Observation = {
  resourceType: 'Observation',
  status: 'final', // required by the specification
  code: { text: 'Heart rate' }, // required by the specification
  subject: { reference: 'Patient/example' },
  valueQuantity: { value: 72, unit: 'beats/minute' },
};
```

The same name exists in every release, so working across versions is a matter of importing the one you want:

```ts
import type { Patient } from 'health-types/R4/Patient';
import type { Patient as PatientR5 } from 'health-types/R5/Patient';
```

## Faithful to the Specification

I was deliberate about making the types say what the specification says:

- **Required fields are required** -- a property loses its `?` when the schema lists it as required or the specification gives it a minimum cardinality of 1
- **Coded values are unions** -- a `code` field with a required binding becomes a union of the allowed codes, so `gender: 'robot'` on a `Patient` is a compile error
- **Every property is documented** -- each one carries its description from the specification as JSDoc, so the definition shows up in your editor
- **Primitive extensions are typed** -- every primitive has its optional `_name` companion, the way FHIR JSON writes them
- **`ResourceList` narrows** -- it is the union of every resource, and switching on `resourceType` gives you the right type in each branch

Leave out a field the specification requires and TypeScript tells you:

```ts
import type { Observation } from 'health-types/R4/Observation';

// @ts-expect-error `status` and `code` are required by the specification
const incomplete: Observation = { resourceType: 'Observation' };
```

## Tested Against Real Data

To see how well the types fit, I type-checked every example resource HL7 publishes against the types of its release:

| Release | Examples | Pass  |
| ------- | -------- | ----- |
| STU3    | 1,664    | 89.5% |
| R4      | 2,911    | 93.1% |
| R4B     | 3,022    | 99.2% |
| R5      | 2,824    | 99.9% |

Almost every rejection is an official example that omits a field the specification requires. None is rejected because of a wrong code or a missing property in the types.

## What It Is Not

These types describe the shape of FHIR JSON. They are not a validator:

- Date and URI formats, maximum cardinalities and FHIRPath invariants are out of scope
- Profiles and implementation guides are not modelled
- A `Reference` is not typed by its target resource
- DSTU2 is not included

If you need to know that a resource is valid, you still need a validator. If you want your editor and compiler to catch the common mistakes before the code runs, this is for that.

## Use Cases

This package is for anyone who handles FHIR resources in TypeScript:

- Building or consuming a FHIR API
- Writing SMART on FHIR apps
- Mapping data between FHIR releases
- Writing test fixtures that stay in step with the specification
- Learning FHIR with the specification's own documentation a hover away

## Getting Started

Install it as a dev dependency (TypeScript 4.9 or newer):

```bash
npm install --save-dev health-types
```

Always use `import type`. The package contains declarations only, so a plain `import` has nothing to load at run time.

## A Second Attempt

This project started in 2020 as a prototype that inlined HL7's JSON Schema into one large nested interface per resource. It could not express recursive types, it duplicated shared datatypes in every file, and it lost which fields were required. In 2026 I rebuilt it around a generator that writes one file per type and reads the specification's structure definitions and value sets as well as the schema.

## Check It Out

The full source and documentation are on GitHub:

- [health-types on GitHub](https://github.com/dmhalejr/health-types)
- [health-types on npm](https://www.npmjs.com/package/health-types)

I'd love to hear feedback or see contributions. Give it a try and let the compiler read the specification for you.
