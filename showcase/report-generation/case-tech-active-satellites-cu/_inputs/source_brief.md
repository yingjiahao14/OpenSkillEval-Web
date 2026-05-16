# Active Satellites Currently In Orbit (2026)

## About the Dataset

This dataset is a real-time catalog of **14,875 active satellites** currently orbiting Earth, sourced from the **CelesTrak** space-tracking platform via **NORAD** Two-Line Element (TLE) data. It was published on Kaggle (`ibrahimqasimi/active-satellites-currently-in-orbit`) and covers the full range of operational spacecraft — from mega-constellations like Starlink to individual science missions, weather satellites, GPS navigation satellites, reconnaissance platforms, and the International Space Station.

- **File:** `Active_Satellites_In_Orbit.csv`
- **Rows:** 14,875
- **Columns:** 17

## Column Schema

| Column Name | Type | Description |
|---|---|---|
| OBJECT_NAME | String | Satellite name (e.g., STARLINK-1234, ISS, GPS BIIR-2) |
| OBJECT_ID | String | International designator in format YYYY-NNNXXX (launch year, launch number, piece letter). Useful for extracting launch year. |
| EPOCH | String (datetime) | Date/time when the orbital element set was generated. Format: ISO 8601. Most entries are very recent. |
| MEAN_MOTION | Float | Number of orbits per day. Key for orbit classification: >14 ≈ LEO, ~1.0 ≈ GEO, between ≈ MEO. |
| ECCENTRICITY | String | Orbit shape factor (0 = perfectly circular, approaching 1 = highly elliptical). Stored as a string with leading decimal (e.g., ".002524"); needs conversion to float. |
| INCLINATION | Float | Orbital tilt relative to the equator in degrees (0° = equatorial, 90° = polar). |
| RA_OF_ASC_NODE | Float | Right ascension of the ascending node in degrees. |
| ARG_OF_PERICENTER | Float | Argument of perigee in degrees. |
| MEAN_ANOMALY | Float | Position of the satellite in its orbit at EPOCH, in degrees. |
| EPHEMERIS_TYPE | Integer | Always 0 in standard TLE data. |
| CLASSIFICATION_TYPE | String | Security classification ("U" = unclassified for most entries). |
| NORAD_CAT_ID | Integer | Unique NORAD catalog number for each object. |
| ELEMENT_SET_NO | Integer | Element set version number. |
| REV_AT_EPOCH | Integer | Revolution (orbit) count at the time of EPOCH. |
| BSTAR | String/Integer | Atmospheric drag coefficient (B* term). Stored in scientific notation as a string (e.g., ".64393E-3"); needs parsing. |
| MEAN_MOTION_DOT | String | First derivative of mean motion (drag term). Stored as a string. |
| MEAN_MOTION_DDOT | Integer | Second derivative of mean motion. Typically 0. |

## Key Analysis Notes

1. **Orbit Classification:** Use `MEAN_MOTION` to classify orbits. Satellites with >14 rev/day are in LEO (~160–2,000 km altitude). Those near 1.0 rev/day are in GEO (~35,786 km). Values between indicate MEO. Highly eccentric orbits (high `ECCENTRICITY`) with unusual mean motions may be HEO (e.g., Molniya orbits).

2. **Constellation Identification:** The `OBJECT_NAME` field contains constellation prefixes (e.g., "STARLINK-", "ONEWEB-", "IRIDIUM", "GPS"). Parsing these prefixes enables grouping by operator/constellation.

3. **Launch Year Extraction:** The first four characters of `OBJECT_ID` represent the launch year (e.g., "2024-" means launched in 2024). This enables temporal analysis of the active fleet.

4. **Data Quality:** `ECCENTRICITY`, `BSTAR`, and `MEAN_MOTION_DOT` are stored as strings and require type conversion before numerical analysis. `MEAN_MOTION_DDOT` and `EPHEMERIS_TYPE` are nearly always 0 and carry little analytical value. No significant missing values are reported, but string-encoded scientific notation fields need careful parsing.

5. **Starlink Dominance:** Approximately 6,000+ of the 14,875 satellites belong to SpaceX's Starlink constellation, which will heavily skew distributions unless filtered or segmented.