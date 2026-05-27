# Energy Transition Dual-Track Timeline

## Overview
Two datasets capture the global energy transition from 2000 to 2035: a set of discrete milestone events on both the fossil retirement and clean energy tracks, and a continuous time series of clean energy's share of global electricity generation.

## Data Source

### energy_transition_events
Contains 37 event records with the following fields:
- **year** (integer, 2001–2025): year the event occurred or was announced
- **track** (string, "fossil" or "clean"): which side of the transition the event belongs to
- **sub_type** (string): energy sub-category — one of coal, oil, gas, solar, wind, hydrogen
- **event** (string): brief description of the milestone or retirement event
- **significance** (integer, 3–9): editorial significance score indicating the event's impact on the global energy transition; higher values denote more transformative events

### clean_energy_generation_share
Contains 23 records with:
- **year** (integer, 2000–2035): calendar year (includes projections post-2024)
- **clean_share_pct** (float, 19.2–62.0): percentage of global electricity generated from clean sources (solar, wind, hydro, nuclear, other renewables)

## Data Notes
- Significance scores are editorially assigned based on expert assessments and are approximate.
- Generation share values after 2024 are projections based on IEA and IRENA scenarios.
- Events are representative milestones, not exhaustive.
- Clean energy share includes hydro and nuclear alongside variable renewables.