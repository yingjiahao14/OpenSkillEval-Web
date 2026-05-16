# Fintech Disruption: Traditional Banking vs Digital Finance (2015–2024)

## Overview
Four datasets tracking the global shift from traditional banking to fintech-driven digital finance across four regions (North America, Europe, Asia-Pacific, Latin America) over a ten-year period from 2015 to 2024.

## Data Source

### digital_payment_penetration
Annual digital payment adoption rate as a percentage of the adult population. Fields: `year` (integer, 2015–2024), `region` (string, 4 categories), `penetration_pct` (float, 18.3–91.2%). Represents share of adults who made at least one digital payment transaction in the year.

### traditional_bank_branches
Total number of physical bank branch locations in thousands. Fields: `year` (integer, 2015–2024), `region` (string, 4 categories), `branches_k` (float, 58.6–315.8 thousand). Covers commercial and retail bank branches.

### neobank_users
Cumulative registered users of digital-only banks (neobanks) in millions. Fields: `year` (integer, 2016–2024), `region` (string, 4 categories), `users_m` (float, 0.8–498.3 million). Starts from 2016 when neobanks began gaining traction.

### digital_bank_licenses
Cumulative count of full digital banking licenses approved by national regulators. Fields: `year` (integer, 2015–2024), `region` (string, 4 categories), `cumulative_licenses` (integer, 0–85).

## Data Notes
- All figures are estimated composites across countries within each region
- Digital payment penetration includes mobile wallets, online banking transfers, and contactless card payments
- Neobank user counts include registered accounts; active user rates vary by region
- License counts reflect full banking licenses only, excluding e-money or payment institution licenses
- The 2020 spike in digital adoption reflects pandemic-accelerated behavioral shifts